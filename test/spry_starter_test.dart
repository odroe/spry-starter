import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:test/test.dart';

void main() {
  late _ServerHandle server;

  setUp(() async {
    server = await _startServer();
  });

  tearDown(() async {
    await server.close();
  });

  Uri url(String path) => Uri.parse('http://127.0.0.1:${server.port}$path');

  test('GET /', () async {
    final response = await http.get(url('/'));
    expect(response.statusCode, 200);
    expect(response.body, 'Hello, World!');
  });

  test('Any /', () async {
    final client = http.Client();
    const verbs = ['DELETE', 'PATCH', 'POST', 'PUT'];
    for (final String verb in verbs) {
      final request = http.Request(verb, url('/'));
      final stream = await client.send(request);
      expect(stream.statusCode, 200, reason: 'verb=$verb');
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

Future<_ServerHandle> _startServer() async {
  final socket = await ServerSocket.bind(InternetAddress.loopbackIPv4, 0);
  final port = socket.port;
  await socket.close();

  final tempDir = Directory('test/.tmp');
  await tempDir.create(recursive: true);
  final configFile = File('test/.tmp/spry_test_$port.config.dart');
  await configFile.writeAsString('''
import 'package:spry/config.dart';

void main() {
  defineSpryConfig(host: '127.0.0.1', port: $port, target: BuildTarget.vm);
}
''');

  final process = await Process.start(
    Platform.resolvedExecutable,
    ['run', 'spry', 'serve', '--config', configFile.path],
    workingDirectory: Directory.current.path,
  );
  final output = StringBuffer();
  process.stdout
      .transform(utf8.decoder)
      .transform(const LineSplitter())
      .listen((line) => output.writeln(line));
  process.stderr
      .transform(utf8.decoder)
      .transform(const LineSplitter())
      .listen((line) => output.writeln(line));

  final baseUri = Uri.parse('http://127.0.0.1:$port/');
  for (var attempt = 0; attempt < 60; attempt++) {
    final status = await process.exitCode.timeout(
      const Duration(milliseconds: 1),
      onTimeout: () => -1,
    );
    if (status != -1) {
      throw StateError(
        'spry serve exited before startup (code $status)\n${output.toString()}',
      );
    }

    try {
      final response = await http.get(baseUri);
      if (response.statusCode == 200) {
        return _ServerHandle(
          process: process,
          port: port,
          configFile: configFile,
        );
      }
    } on SocketException {
      // Wait for the generated runtime to start accepting requests.
    }

    await Future<void>.delayed(const Duration(milliseconds: 250));
  }

  await _stopProcess(process);
  if (await configFile.exists()) {
    await configFile.delete();
  }
  throw StateError('spry serve did not become ready\n${output.toString()}');
}

Future<void> _stopProcess(Process process) async {
  process.kill();
  await process.exitCode.timeout(
    const Duration(seconds: 5),
    onTimeout: () {
      process.kill(ProcessSignal.sigkill);
      return process.exitCode;
    },
  );
}

class _ServerHandle {
  _ServerHandle({
    required this.process,
    required this.port,
    required this.configFile,
  });

  final Process process;
  final int port;
  final File configFile;

  Future<void> close() async {
    await _stopProcess(process);
    if (await configFile.exists()) {
      await configFile.delete();
    }
  }
}
