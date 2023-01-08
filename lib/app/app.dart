// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:spry_router/spry_router.dart' as _i1;

import '(get)/handler.dart' as _i3;
import 'handler.dart' as _i2;
import 'users/[id]/(delete)/handler.dart' as _i7;
import 'users/[id]/(get)/handler.dart' as _i8;
import 'users/[id]/(patch)/handler.dart' as _i9;
import 'users/[id]/id.middleware.dart' as _i6;
import 'users/(get)/handler.dart' as _i5;
import 'users/(post)/handler.dart' as _i4;

final _i1.Router app = _i1.Router()
  ..all(
    r'/',
    _i2.handler,
  )
  ..route(
    r'get',
    r'/',
    _i3.handler,
  )
  ..mount(
    r'users',
    router: _i1.Router()
      ..route(
        r'post',
        r'/',
        _i4.handler,
      )
      ..route(
        r'get',
        r'/',
        _i5.handler,
      )
      ..mount(
        r':id(\d+)',
        router: _i1.Router()
          ..param(
            r'id',
            _i6.middleware,
          )
          ..route(
            r'delete',
            r'/',
            _i7.handler,
          )
          ..route(
            r'get',
            r'/',
            _i8.handler,
          )
          ..route(
            r'patch',
            r'/',
            _i9.handler,
          ),
      ),
  );
