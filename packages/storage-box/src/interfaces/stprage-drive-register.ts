import { StorageBoxInterface } from "./storage-box.interface";
import { StorageBoxDriveInterface } from "./storage-drive.interface";

/**
 * Storage drive register.
 **/
export type StorageBoxDriveRegister<T extends StorageBoxDriveInterface> = (
  box: StorageBoxInterface
) => T;
