import 'package:spry/spry.dart';
import 'package:spry_json/spry_json.dart';

import '../../../database.dart';

void handler(Context context) {
  context.response.json(users);
}
