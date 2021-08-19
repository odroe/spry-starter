Node.js fs driver for [Storage Box](https://github.com/odroe/storage-box)

## Installation

```bash
npm i @storage-box/fs
```

If you using Yarn:

```bash
yarn add @storage-box/fs
```

## Usage

The `register` default storage file to `[CWD]/.storage-box` directory.

```ts
import { StorageBox } from "storage-box";
import { register } from "@storage-box/fs";

// Usge Storage static method
StorageBox.reguster("fs", register);

// Or use StorageBox instance register in box.
const box = new StorageBox("My Box");
box.register("fs", register);
```

## Configuration

Custom cache file directory:

```ts
import { StorageBox } from "storage-box";
import { directory } from "@storage-box/fs";

StorageBox.reguster("fs", directory("custom-cache-dir"));
```

## License

BSD 3-Clause License.

Copyright (c) 2021, [Odroe, Inc.](https://odroe.com)
All rights reserved.
