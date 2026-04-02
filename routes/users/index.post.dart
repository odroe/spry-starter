import 'package:spry/spry.dart';
import 'package:spry_starter/database.dart';

Future<Response> handler(Event event) async {
  final payload = await _readJsonBody(event);
  if (payload == null) {
    return Response.json(
      {'error': 'invalid_payload', 'message': 'Expected a JSON object body.'},
      ResponseInit(status: 400),
    );
  }

  final name = payload['name'];
  final email = payload['email'];
  if (name is! String || name.trim().isEmpty) {
    return Response.json(
      {'error': 'invalid_name', 'message': 'The name field is required.'},
      ResponseInit(status: 400),
    );
  }
  if (email is! String || email.trim().isEmpty) {
    return Response.json(
      {'error': 'invalid_email', 'message': 'The email field is required.'},
      ResponseInit(status: 400),
    );
  }

  final user = createUser(name: name, email: email);
  return Response.json(user, ResponseInit(status: 201));
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
