import 'package:spry/spry.dart';
import 'package:spry_json/spry_json.dart';
import 'package:spry_starter/database.dart';

/// Generates a new user ID.
int generateId() {
  final int maxId = users.map((user) => user['id'] as int).reduce(
        (value, element) => value > element ? value : element,
      );
  return maxId + 1;
}

void handler(Context context) async {
  final Map<String, Object> body =
      ((await context.request.json()) as Map).cast();

  final String name = body['name'] as String;
  final String email = body['email'] as String;

  // Create a new user
  final Map<String, Object> user = {
    'id': generateId(),
    'name': name,
    'email': email,
  };

  // Add the user to the users data
  users.add(user);

  // Send the user as JSON
  context.response
    ..status(201)
    ..json(user);
}
