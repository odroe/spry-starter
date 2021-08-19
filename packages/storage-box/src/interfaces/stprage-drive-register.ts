import { StorageBoxInterface } from "./storage-box.interface";
import { StorageDriveInterface } from "./storage-drive.interface";

/**
 * Storage drive register.
 **/
export type StorageDriveRegister<T extends StorageDriveInterface> = (
  box: StorageBoxInterface
) => T;
