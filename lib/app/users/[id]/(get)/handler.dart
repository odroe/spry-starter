import 'package:spry/spry.dart';
import 'package:spry_json/spry_json.dart';
import 'package:spry_router/spry_router.dart';

import '../../../../database.dart';

void handler(Context context) {
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

  // Send the user as JSON
  response.json(user);
}
