import 'package:spry/spry.dart';
import 'package:spry_starter/app/app.dart';
import 'package:spry_starter/create_spry.dart';

void main() async {
  final Spry spry = createSpry();

  await spry.listen(app, port: 3000);
  print('Spry is listening on http://localhost:3000');
}
