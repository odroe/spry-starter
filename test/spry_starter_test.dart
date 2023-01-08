import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:http_methods/http_methods.dart';
import 'package:spry/spry.dart';
import 'package:spry_starter/app/app.dart';
import 'package:spry_starter/create_spry.dart';
import 'package:test/test.dart';

void main() async {
  late HttpServer server;

  setUp(() async {
    // Create a http server
    server = await HttpServer.bind('localhost', 0);

    final Spry spry = createSpry();
    final void Function(HttpRequest request) handler = spry(app);

    // Start the spry server
    server.listen(handler);
  });

  tearDown(() => server.close());

  Uri url(String path) => Uri.parse('http://localhost:${server.port}$path');

  test('GET /', () async {
    final response = await http.get(url('/'));
    expect(response.statusCode, 200);
    expect(response.body, 'Hello, World!');
  });

  test('Any /', () async {
    final client = http.Client();
    final Iterable<String> verbs =
        httpMethods.where((element) => element.toLowerCase() != 'get');
    for (final String verb in verbs) {
      final request = http.Request(verb, url('/'));
      final stream = await client.send(request);
      expect(stream.statusCode, 200);
    }

    client.close();
  });

  group('users', () {
    // Get all users
    test('GET /users', () async {
      final response = await http.get(url('/users'));
      expect(response.statusCode, 200);

      final dynamic users = json.decode(response.body);
      expect(users, isList);
    });

    /// Create a user
    /// POST /users
    test('POST /users', () async {
      final body = {
        'name': 'John Doe',
        'email': 'i@john.doe',
      };

      final response = await http.post(url('/users'), body: json.encode(body));
      expect(response.statusCode, 201);

      final dynamic user = json.decode(response.body);
      expect(user, isMap);
      expect(user['id'], isNotNull);
      expect(user['name'], body['name']);
      expect(user['email'], body['email']);
    });

    // Delete a user
    test('DELETE /users/:id', () async {
      // Read all users
      final response = await http.get(url('/users'));
      expect(response.statusCode, 200);

      final List<Map<String, dynamic>> users =
          (json.decode(response.body) as List).cast<Map<String, dynamic>>();
      final Map<String, dynamic> user = users.first;

      // Delete the user
      final deleteResponse = await http.delete(url('/users/${user['id']}'));
      expect(deleteResponse.statusCode, 204);
    });

    // Update a user
    // Patch /users/:id
    test('PATCH /users/:id', () async {
      // Read all users
      final response = await http.get(url('/users'));
      expect(response.statusCode, 200);

      final List<Map<String, dynamic>> users =
          (json.decode(response.body) as List).cast<Map<String, dynamic>>();
      final Map<String, dynamic> user = users.first;

      // Update the user
      final body = {
        'name': 'John Doe',
        'email': 'test@demo.com',
      };

      final patchResponse = await http.patch(url('/users/${user['id']}'),
          body: json.encode(body));
      expect(patchResponse.statusCode, 200);

      final dynamic updatedUser = json.decode(patchResponse.body);
      expect(updatedUser, isMap);
      expect(updatedUser['id'], user['id']);
      expect(updatedUser['name'], body['name']);
      expect(updatedUser['email'], body['email']);
    });
  });
}
