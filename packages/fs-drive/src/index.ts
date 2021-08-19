import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import {
  StorageBoxDriveInterface,
  StorageBoxDriveRegister,
  StorageBoxInterface,
} from "storage-box";

// Create a hash of content.
function sha1(content: string): string {
  const hash = createHash("sha1");
  hash.update(content);

  return hash.digest("hex");
}

// read a file
function read(filename: string): string | undefined {
  // Check file exists
  if (!fs.existsSync(filename)) {
    return;
  }

  // Read file
  return fs.readFileSync(filename, "utf8");
}

// write a file
function write(filename: string, content: string): void {
  // Check parent directory exists,
  // create if not
  const parent = path.dirname(filename);
  if (!fs.existsSync(parent)) {
    fs.mkdirSync(parent, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filename, content);
}

export class StorageBoxFsDrive implements StorageBoxDriveInterface {
  constructor(
    protected readonly box: StorageBoxInterface,
    public readonly root: string
  ) {
    // Check root directory exists.
    if (fs.existsSync(root)) {
      // Check root is a directory.
      if (!fs.lstatSync(root).isDirectory()) {
        fs.unlinkSync(root);
      }
    }

    // Create root directory.
    fs.mkdirSync(root, { recursive: true });
  }

  #path(key: string): string {
    return path.join(this.root, sha1(key));
  }

  async get<T>(key: string): Promise<T> {
    try {
      const value = read(this.#path(key));
      return value ? JSON.parse(value) : undefined;
    } catch (_error) {
      return undefined as any;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    write(this.#path(key), JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    fs.unlinkSync(this.#path(key));
  }
}

export const register: StorageBoxDriveRegister<StorageBoxFsDrive> = (
  box: StorageBoxInterface
) => {
  const root = process.cwd();
  const cacheDir = path.join(root, ".storage-box");

  return new StorageBoxFsDrive(box, path.join(cacheDir, sha1(box.name)));
};

export const directory: (
  path: string
) => StorageBoxDriveRegister<StorageBoxFsDrive> =
  (path: string) => (box: StorageBoxInterface) =>
    new StorageBoxFsDrive(box, path);
