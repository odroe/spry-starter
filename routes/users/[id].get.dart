// ignore_for_file: file_names

import 'package:spry/spry.dart';
import 'package:spry_starter/database.dart';

Response handler(Event event) {
  final id = int.tryParse(event.params.required('id'));
  if (id == null) {
    return Response.json(
      {'error': 'invalid_id', 'message': 'The user id must be an integer.'},
      ResponseInit(status: 400),
    );
  }

  final user = getUser(id);
  if (user == null) {
    return Response.json(
      {'error': 'not_found', 'message': 'No user exists for id $id.'},
      ResponseInit(status: 404),
    );
  }

  return Response.json(user);
}
