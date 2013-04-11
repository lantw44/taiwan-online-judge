#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_INIT([taiwan-online-judge], [0.1], [BUG-REPORT-ADDRESS])
AM_INIT_AUTOMAKE([foreign -Wall])
AM_SILENT_RULES([yes])
AC_CONFIG_SRCDIR([include/judge_def.h])
AC_CONFIG_HEADERS([include/config.h])
AC_CONFIG_MACRO_DIR([m4])

# Checks for programs.
AC_PROG_CC
AC_PROG_CXX
AM_PROG_CC_C_O
AM_PROG_AR
AC_PROG_LIBTOOL

# Checks for libraries.
# FIXME: Replace `main' with a function in `-lbz2':
AC_CHECK_LIB([bz2], [main])
# FIXME: Replace `main' with a function in `-lcurl':
AC_CHECK_LIB([curl], [main])
# FIXME: Replace `main' with a function in `-ldl':
AC_CHECK_LIB([dl], [main])
# FIXME: Replace `main' with a function in `-ljson':
AC_CHECK_LIB([json], [main])
# FIXME: Replace `main' with a function in `-lpq':
AC_CHECK_LIB([pq], [main])
# FIXME: Replace `main' with a function in `-ltar':
AC_CHECK_LIB([tar], [main])

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
