import 'package:spry/spry.dart';
import 'package:spry_router/spry_router.dart';

import '../../../../database.dart';

/// Delete a user
void handler(Context context) {
  final Request request = context.request;
  final Response response = context.response;

  // Get the [id] parameter from the request.
  final int? id = request.param('id') as int?;
  if (id == null) {
    throw HttpException.badRequest();
  }

  users.removeWhere((element) => element['id'] == id);
  response.status(204);
}
