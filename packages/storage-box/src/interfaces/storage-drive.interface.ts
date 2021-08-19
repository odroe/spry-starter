/**
 * Storage drive interface.
 **/
export interface StorageBoxDriveInterface {
  /**
   * Get a cached value of the drive.
   *
   * @param key - Cache key.
   *
   * @returns The cached value.
   **/
  get<T>(key: string): Promise<T>;

  /**
   * Set a value of the drive.
   *
   * @param key - Cache key.
   * @param value - Value to set.
   *
   **/
  set<T>(key: string, value: T): Promise<void>;

  /**
   * Remove a cached value of the drive.
   *
   * @param key - Cache key.
   *
   **/
  remove(key: string): Promise<void>;
}
