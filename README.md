# Storage Box

 Intuitive and easy-to-use storage box.

 ## Features

 - **Intuitive**: No need to learn new interfaces.
 - **Easy-to-use**: Streamlined API reduces user burden.

 ## Installation

 ```bash
 $ npm i storage-box --save
 ```

 If you are using Yarn:
 ```bash
 $ yarn add storage-box
 ```

 ## Usage

 ```ts
 import { StorageBox } from 'storage-box';

 const box = new StorageBox('My Box');

 // Read a value
 const value = box.get('key');

 // Write a value
 box.set('key', 'value');

 // Delete a value
 box.delete('key');
 ```

 ## Drives

  - **Memory**: Memory is the default storage mode of Storage Box, and it does not need to be installed out of the box.

## Contribution

Welcome to contribute to Storage Box. Here are some ways you can help:

 - [Report bugs](https://github.com/odroe/storage-box/issues)
 - [Create a Pull Request](https://github.com/odroe/storage-box/pulls)

## License

BSD 3-Clause License.

Copyright (c) 2021, [Odroe, Inc.](https://odroe.com)
All rights reserved.
