const List<Map<String, Object?>> _seedUsers = [
  {'id': 1, 'name': 'John Doe', 'email': 'john@spry.fun'},
  {'id': 2, 'name': 'Jane Doe', 'email': 'jane@spry.fun'},
  {'id': 3, 'name': 'Seven Du', 'email': 'seven@odroe.com'},
];

final List<Map<String, Object?>> _users = _seedUsers.map(_cloneUser).toList();

List<Map<String, Object?>> listUsers() {
  return _users.map(_cloneUser).toList(growable: false);
}

Map<String, Object?>? getUser(int id) {
  final user = _findUser(id);
  return user == null ? null : _cloneUser(user);
}

Map<String, Object?> createUser({
  required String name,
  required String email,
}) {
  final nextId = _users.fold<int>(
    0,
    (maxId, user) => user['id'] is int && (user['id'] as int) > maxId
        ? user['id'] as int
        : maxId,
  );

  final user = <String, Object?>{
    'id': nextId + 1,
    'name': name,
    'email': email,
  };
  _users.add(user);
  return _cloneUser(user);
}

Map<String, Object?>? updateUser(
  int id, {
  String? name,
  String? email,
}) {
  final user = _findUser(id);
  if (user == null) return null;

  if (name != null) {
    user['name'] = name;
  }
  if (email != null) {
    user['email'] = email;
  }

  return _cloneUser(user);
}

bool deleteUser(int id) {
  final index = _users.indexWhere((user) => user['id'] == id);
  if (index == -1) return false;
  _users.removeAt(index);
  return true;
}

Map<String, Object?>? _findUser(int id) {
  for (final user in _users) {
    if (user['id'] == id) return user;
  }
  return null;
}

Map<String, Object?> _cloneUser(Map<String, Object?> user) {
  return Map<String, Object?>.from(user);
}
