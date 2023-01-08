import 'package:spry/spry.dart';
import 'package:spry_json/spry_json.dart';
import 'package:spry_router/spry_router.dart';

import '../../../../database.dart';

/// Update a user
void handler(Context context) async {
  final Request request = context.request;
  final Response response = context.response;

  // Get the [id] parameter from the request.
  final int? id = request.param('id') as int?;

  // If the [id] parameter is not null, throw a bad request error.
  if (id == null) {
    throw HttpException.badRequest();
  }

  // Get the user from the users data
  final Map<String, Object?> user = users.firstWhere(
    (element) => element['id'] == id,
    orElse: () => throw HttpException.notFound(),
  );

  // Get the body from the request
  final Map<String, Object> body =
      ((await context.request.json()) as Map).cast();
  final String? name = body['name'] as String?;
  final String? email = body['email'] as String?;

  // Update the user
  user['name'] = name ?? user['name'];
  user['email'] = email ?? user['email'];

  // Store the user in the users data
  users[users.indexOf(user)] = user;

  // Send the user as JSON
  response.json(user);
}
