bin_PROGRAMS = center_server judge_server

center_server_CFLAGS = -I$(srcdir)/include -rdynamic -fvisibility=hidden \
					   -pthread $(JSON_CFLAGS) $(CURL_CFLAGS)
center_server_LDFLAGS = -pthread
center_server_LDADD = -ldl -lpq -ltar -lbz2 $(JSON_LIBS) $(CURL_LIBS)
center_server_SOURCES = \
	center_server.cpp center_manage.cpp center_judge.cpp \
	tool.cpp event_exec.cpp \
	center_com.h center_judge.h center_manage.h center_server.h center.h \
	netio.h tpool.h judgm_manage.h event_exec.h tool.h

judge_server_CFLAGS = -I$(srcdir)/include -pthread
judge_server_LDFLAGS = -pthread
judge_server_LDADD = -ldl -lbz2 -ltar
judge_server_SOURCES = \
	judge_server.cpp judge_manage.cpp tool.cpp \
	tpool.h judge.h judgm_line.h judgm_lib.h judge_manage.h judge_server.h \
	netio.h center_com.h tool.h

pkglib_LTLIBRARIES = libjmod_test_check.la libjmod_test_line.la libjmod_test_manage.la
libjmod_test_check_la_CFLAGS = -I$(srcdir)/include 
libjmod_test_check_la_LDFLAGS = 
libjmod_test_check_la_LIBADD = 
libjmod_test_check_la_SOURCES = jmod_test_check.cpp \
	judgm_lib.h jmod_test.h jmod_test_check.h

libjmod_test_line_la_CFLAGS = -I$(srcdir)/include -pthread
libjmod_test_line_la_LDFLAGS = -pthread $(JSON_CFLAGS)
libjmod_test_line_la_LIBADD = $(JSON_LIBS)
libjmod_test_line_la_SOURCES = jmod_test_line.cpp \
	judgm_lib.h judgm_line.h jmod_test.h jmod_test_line.h

libjmod_test_manage_la_CFLAGS = -I$(srcdir)/include -pthread
libjmod_test_manage_la_LDFLAGS = -pthread $(JSON_CFLAGS)
libjmod_test_manage_la_LIBADD = -ldl $(JSON_LIBS)
libjmod_test_manage_la_SOURCES = jmod_test_manage.cpp \
	judgm_lib.h judgm_manage.h jmod_test.h jmod_test_manage.h
