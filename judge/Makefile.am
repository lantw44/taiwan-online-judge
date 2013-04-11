bin_PROGRAMS = center_server judge_server

center_server_CFLAGS = -I../include -rdynamic -fvisibility=hidden -pthread
center_server_LDFLAGS = -pthread
center_server_LDADD = -ldl -lpq -ltar -lbz2 -ljson -lcurl
center_server_SOURCES = center_server.cpp center_manage.cpp center_judge.cpp tool.cpp event_exec.cpp

judge_server_CFLAGS = -I../include -pthread
judge_server_LDFLAGS = -pthread
judge_server_LDADD = -ldl -lbz2 -ltar
judge_server_SOURCES = judge_server.cpp judge_manage.cpp tool.cpp


lib_LTLIBRARIES = libjmod_test_check.la libjmod_test_line.la libjmod_test_manage.la
libjmod_test_check_la_CFLAGS = -I../include 
libjmod_test_check_la_LDFLAGS = 
libjmod_test_check_la_LIBADD = 
libjmod_test_check_la_SOURCES = jmod_test_check.cpp

libjmod_test_line_la_CFLAGS = -I../include -pthread
libjmod_test_line_la_LDFLAGS = -pthread
libjmod_test_line_la_LIBADD = -ljson
libjmod_test_line_la_SOURCES = jmod_test_line.cpp

libjmod_test_manage_la_CFLAGS = -I../include -pthread
libjmod_test_manage_la_LDFLAGS = -pthread
libjmod_test_manage_la_LIBADD = -ldl -ljson
libjmod_test_manage_la_SOURCES = jmod_test_manage.cpp
