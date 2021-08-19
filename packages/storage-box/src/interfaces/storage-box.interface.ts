import { StorageDriveInterface } from "./storage-drive.interface";
import { StorageDriveRegister } from "./stprage-drive-register";

/**
 * StorageBox interface
 **/
export interface StorageBoxInterface extends StorageDriveInterface {
  /**
   * The name of the box.
   **/
  readonly name: string;

  /**
   * Get a drive.
   *
   * @param name The name of the drive.
   * @returns A drive.
   *
   **/
  getDrive<T extends StorageDriveInterface>(name: string): T;

  /**
   * Register a drive.
   *
   * @param name The name of the drive.
   * @param drive The drive.
   *
   **/
  register<T extends StorageDriveInterface>(
    name: string,
    register: StorageDriveRegister<T>
  ): void;
}
