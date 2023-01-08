import 'package:spry/spry.dart';
import 'package:spry_router/spry_router.dart';

Future<void> middleware(Context context, Object? value, ParamNext next) async {
  if (value != null) {
    value = int.tryParse(value.toString());
  }

  await next(value);
}
