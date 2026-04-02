import 'package:spry/spry.dart';
import 'package:spry_starter/database.dart';

Response handler(Event event) {
  return Response.json(listUsers());
}
