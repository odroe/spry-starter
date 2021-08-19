import { StorageBoxDriveInterface } from "./storage-drive.interface";
import { StorageBoxDriveRegister } from "./stprage-drive-register";

/**
 * StorageBox interface
 **/
export interface StorageBoxInterface extends StorageBoxDriveInterface {
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
  getDrive<T extends StorageBoxDriveInterface>(name: string): T;

  /**
   * Register a drive.
   *
   * @param name The name of the drive.
   * @param drive The drive.
   *
   **/
  register<T extends StorageBoxDriveInterface>(
    name: string,
    register: StorageBoxDriveRegister<T>
  ): void;
}
