import 'package:spry/spry.dart';

void handler(Context context) {
  context.response.send(
      'You sent a ${context.request.method} request to ${context.request.uri.path}');
}
