import {
  StorageBoxInterface,
  StorageBoxDriveInterface,
  StorageBoxDriveRegister,
} from "./interfaces";
import { memoryDriveReguster } from "./memory-drive";

export const DEFAULT_STORAGE_DRIVE_NAME = <const>"memory";

/**
 * Storage box.
 * @class
 * @implements {StorageBoxInterface}
 */
export class StorageBox<T extends StorageBoxDriveInterface>
  implements StorageBoxInterface
{
  // Private properties, registed drives creator.
  static #registers: Record<
    string,
    StorageBoxDriveRegister<StorageBoxDriveInterface>
  > = {};

  // Private properties.
  // Internal created drives.
  readonly #internal: Record<string, T> = {};

  // Private properties.
  // Current drive.
  readonly #currentDrive: T;

  /**
   * Constructor.
   *
   * @param {string} name - Storage box name.
   * @param {string} drive - Storage drive name or drive register.
   */
  constructor(
    public readonly name: string,
    public readonly drive:
      | StorageBoxDriveRegister<T>
      | string
      | typeof DEFAULT_STORAGE_DRIVE_NAME = DEFAULT_STORAGE_DRIVE_NAME
  ) {
    if (!name) {
      throw new Error("Storage box name is required.");
    }

    // If drive is string, get drive register.
    if (typeof drive === "string") {
      this.#currentDrive = this.getDrive(drive);

      // If drive is register, create drive.
    } else {
      this.#currentDrive = drive(this);
    }
  }

  /**
   * Get drive.
   *
   * @param {string} drive - Storage drive name.
   *
   * @returns {T}
   *
   * @throws {Error}
   */
  getDrive<T extends StorageBoxDriveInterface>(name: string): T {
    // Get drive register.
    const register: StorageBoxDriveRegister<T> = StorageBox.#registers[
      name
    ] as any;

    // If drive register is not found, throw error.
    if (!register || typeof register !== "function") {
      throw new Error(`Drive "${name}" not found.`);
    }

    // If drive is not created, create drive.
    if (!this.#internal[name]) {
      this.#internal[name] = register(this) as any;
    }

    // Return drive.
    return this.#internal[name] as any;
  }

  /**
   * Register a new drive.
   *
   * @param {string} name - Storage drive name.
   * @param {StorageDriveRegister<T>} register - Storage drive register.
   */
  register<T extends StorageBoxDriveInterface>(
    name: string,
    drive: StorageBoxDriveRegister<T>
  ): void {
    // Register drive.
    StorageBox.register(name, drive);

    // If the drive name is instantiated, destroy it.
    if (this.#internal[name]) {
      delete this.#internal[name];
    }
  }

  /**
   * Get a cached value of the storage box.
   *
   * @param {string} key - Storage key.
   *
   * @returns {T}
   */
  get<T>(key: string): Promise<T> {
    return this.#currentDrive.get<T>(key);
  }

  /**
   * Set a value to the storage box.
   *
   * @param {string} key - Storage key.
   * @param {T} value - Storage value.
   *
   * @returns {Promise<void>}
   */
  set<T>(key: string, value: T): Promise<void> {
    return this.#currentDrive.set<T>(key, value);
  }

  /**
   * Remove a value from the storage box.
   *
   * @param {string} key - Storage key.
   *
   * @returns {Promise<void>}
   */
  remove(key: string): Promise<void> {
    return this.#currentDrive.remove(key);
  }

  /**
   * Register a new drive.
   *
   * @param {string} name - Storage drive name.
   * @param {StorageDriveRegister<T>} register - Storage drive register.
   *
   * @returns {void}
   */
  static register<T extends StorageBoxDriveInterface>(
    name: string,
    drive: StorageBoxDriveRegister<T>
  ): void {
    StorageBox.#registers[name] = drive;
  }
}

// Register memory drive.
// @default
StorageBox.register(DEFAULT_STORAGE_DRIVE_NAME, memoryDriveReguster);
