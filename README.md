# Spry Starter

A starter template for building APIs with the current Spry file-routing runtime.

## Installation

```bash
dart pub get
```

## Running the app

```bash
dart run spry serve
```

The starter uses the current Spry project shape:

```
routes/
  index.dart
  users/
    index.get.dart
    index.post.dart
    [id].get.dart
    [id].patch.dart
    [id].delete.dart
spry.config.dart
```

`routes/` is the source of truth. `spry.config.dart` selects the runtime target and local dev server settings.

## Running tests

```bash
dart test
```

The test suite boots the app through `dart run spry serve`, so it exercises the real generated runtime instead of a hand-written compatibility layer.

## Endpoints

- `GET /`
- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

## About Spry

Read more at [spry.medz.dev](https://spry.medz.dev).
