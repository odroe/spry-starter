// ignore_for_file: file_names

import 'package:spry/spry.dart';
import 'package:spry_starter/database.dart';

Future<Response> handler(Event event) async {
  final id = int.tryParse(event.params.required('id'));
  if (id == null) {
    return Response.json(
      {'error': 'invalid_id', 'message': 'The user id must be an integer.'},
      ResponseInit(status: 400),
    );
  }

  final payload = await _readJsonBody(event);
  if (payload == null) {
    return Response.json(
      {'error': 'invalid_payload', 'message': 'Expected a JSON object body.'},
      ResponseInit(status: 400),
    );
  }

  final name = payload['name'];
  final email = payload['email'];
  if (name != null && (name is! String || name.trim().isEmpty)) {
    return Response.json(
      {'error': 'invalid_name', 'message': 'The name field must be a string.'},
      ResponseInit(status: 400),
    );
  }
  if (email != null && (email is! String || email.trim().isEmpty)) {
    return Response.json(
      {
        'error': 'invalid_email',
        'message': 'The email field must be a string.',
      },
      ResponseInit(status: 400),
    );
  }

  final user = updateUser(id, name: name as String?, email: email as String?);
  if (user == null) {
    return Response.json(
      {'error': 'not_found', 'message': 'No user exists for id $id.'},
      ResponseInit(status: 404),
    );
  }

  return Response.json(user);
}

Future<Map<String, Object?>?> _readJsonBody(Event event) async {
  try {
    final payload = await event.request.json<Object?>();
    if (payload is Map) {
      return payload.cast<String, Object?>();
    }
  } on FormatException {
    return null;
  }

  return null;
}
