import 'package:spry/spry.dart';
import 'package:spry_interceptor/spry_interceptor.dart';

Spry createSpry() {
  final spry = Spry();
  final Interceptor interceptor = Interceptor(
    handler: ExceptionHandler.json(),
  );

  spry.use(interceptor);

  return spry;
}
