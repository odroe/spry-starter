import {
  StorageBoxInterface,
  StorageDriveInterface,
  StorageDriveRegister,
} from "./interfaces";

/**
 * Memory drive for storage box.
 * @class
 * @implements {StorageDriveInterface}
 */
export class MemoryDrive implements StorageDriveInterface {
  // Cached data
  readonly data: Record<string, any> = {};

  /**
   * @param {StorageBoxInterface} box Storage box instance.
   */
  constructor(protected readonly box: StorageBoxInterface) {}

  /**
   * Generate key.
   * @param {string} key Key.
   * @returns {string}
   */
  #generateKey(key: string): string {
    return `${this.box.name}:${key}`;
  }

  /**
   * Get a value from the cache.
   * @param {string} key Key.
   * @returns {T}
   */
  async get<T>(key: string): Promise<T> {
    return this.data[this.#generateKey(key)];
  }

  /**
   * Set a value to the cache.
   * @param {string} key Key.
   * @param {T} value Value.
   * @returns {Promise<void>}
   */
  async set<T>(key: string, value: T): Promise<void> {
    this.data[this.#generateKey(key)] = value;
  }

  /**
   * Delete a value from the cache.
   * @param {string} key Key.
   * @returns {Promise<void>}
   */
  async remove(key: string): Promise<void> {
    delete this.data[this.#generateKey(key)];
  }
}

export const memoryDriveReguster: StorageDriveRegister<MemoryDrive> = (
  box: StorageBoxInterface
) => new MemoryDrive(box);
