import 'package:spry/spry.dart';

Response handler(Event event) {
  if (event.method == 'GET') {
    return Response('Hello, World!');
  }

  return Response(
    'You sent a ${event.method} request to ${event.url.path}',
  );
}
