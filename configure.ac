#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_INIT([taiwan-online-judge], [0.1], [BUG-REPORT-ADDRESS])
AM_INIT_AUTOMAKE([foreign -Wall])
AM_SILENT_RULES([yes])
AC_CONFIG_SRCDIR([include/judge_def.h])
AC_CONFIG_HEADERS([include/config.h])
AC_CONFIG_MACRO_DIR([m4])

# Checks for platform.
AC_CANONICAL_HOST
AC_CANONICAL_BUILD
if test "$build" '!=' "$host" ; then
	AC_MSG_ERROR([This program does not support cross-compiling])
fi

case "${host_cpu}" in
	x86_64|amd64)
		;;
	*)
		AC_MSG_ERROR([This program can only be run on x86_64 platform])
		;;
esac

case "${host_os}" in
	*linux*)
		;;
	*)
		AC_MSG_ERROR([Sorry, we only support Linux])
		;;
esac

# Checks for programs.
AC_PROG_CC
AC_PROG_CXX
AM_PROG_CC_C_O
AM_PROG_AR
AC_PROG_LIBTOOL


# Checks for libraries.
AC_CHECK_LIB([bz2], [BZ2_bzCompress], [true],
	AC_MSG_ERROR([bzip2 is missing]))
AC_CHECK_LIB([dl], [dlopen], [true],
	AC_MSG_ERROR([dl is missing]))
AC_CHECK_LIB([tar], [tar_open], [true],
	AC_MSG_ERROR([libtar is missing]))
AC_CHECK_LIB([pq], [PQconnectdb], [true],
	AC_MSG_ERROR([PostgreSQL client library is missing]))

# pkg-config
PKG_CHECK_MODULES([CURL], [libcurl], [true],
	AC_MSG_ERROR([curl is missing]))
PKG_CHECK_MODULES([JSON], [json], [true],
	AC_MSG_ERROR([json is missing]))

# Checks for header files.
AC_CHECK_HEADERS([arpa/inet.h fcntl.h limits.h netinet/in.h stdlib.h string.h sys/ioctl.h sys/socket.h unistd.h])

# Checks for typedefs, structures, and compiler characteristics.
AC_CHECK_HEADER_STDBOOL
AC_C_INLINE
AC_TYPE_OFF_T
AC_TYPE_PID_T
AC_TYPE_SIZE_T
AC_TYPE_SSIZE_T

# Checks for library functions.
AC_FUNC_FORK
AC_FUNC_MALLOC
AC_FUNC_MMAP
AC_CHECK_FUNCS([dup2 getcwd memset mkdir munmap realpath rmdir socket])

AC_CONFIG_FILES([Makefile judge/Makefile])
AC_OUTPUT
