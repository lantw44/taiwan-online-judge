#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_INIT([taiwan-online-judge], [0.1], [BUG-REPORT-ADDRESS])
AM_INIT_AUTOMAKE([foreign -Wall])
AM_SILENT_RULES([yes])
AC_CONFIG_SRCDIR([include/judge_def.h])
AC_CONFIG_HEADERS([include/judge_conf.h])
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
AC_PROG_MKDIR_P
AC_PROG_INSTALL


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


# options
AC_ARG_WITH([kernel-cc],
	[AS_HELP_STRING([--with-kernel-cc=K_CC], 
		[C compiler used to compile kernel modules @<:@default=gcc@:>@])],
	[with_kernel_cc=$withval], [with_kernel_cc=gcc])
AC_ARG_WITH([kernel-ver],
	[AS_HELP_STRING([--with-kernel-ver=K_VER],
		[select the kernel header version @<:@default=$(shell uname -r)@:>@])],
	[with_kernel_ver=$withval], [with_kernel_ver='$(shell uname -r)'])
AC_ARG_WITH([kernel-src],
	[AS_HELP_STRING([--with-kernel-src=K_SRC],
		[the path to your kernel source tree 
		@<:@default=/lib/modules/K_VER/build@:>@])],
	[with_kernel_src=$withval], 
	[with_kernel_src=/lib/modules/$with_kernel_ver/build])

AC_SUBST([KERNEL_CC], ["$with_kernel_cc"])
AC_SUBST([KERNEL_SRC], ["$with_kernel_src"])

# Checks for header files.
dnl We only support Linux, so it is no need to check header files (?)
dnl AC_CHECK_HEADERS([arpa/inet.h fcntl.h limits.h netinet/in.h stdlib.h string.h sys/ioctl.h sys/socket.h unistd.h])

# Checks for typedefs, structures, and compiler characteristics.

dnl We only use C++, so we do not have to check them.
dnl AC_CHECK_HEADER_STDBOOL
dnl AC_C_INLINE

AC_TYPE_OFF_T
AC_TYPE_PID_T
AC_TYPE_SIZE_T
AC_TYPE_SSIZE_T

# Checks for library functions.
AC_FUNC_FORK
test x"${ac_cv_func_fork_works}" = xyes || \
	AC_MSG_ERROR(This program requires a working fork function.)

AC_FUNC_MMAP
test x"${ac_cv_func_mmap_fixed_mapped}" = xyes || \
	AC_MSG_ERROR(This program requires a working mmap function.)

dnl We do not use malloc(0), so this check may not be important. (?)
dnl AC_FUNC_MALLOC

for f in \
	dup2 getcwd memset mkdir munmap realpath rmdir socket
do
	AC_CHECK_FUNC([$f], [true],
		[AC_MSG_ERROR(This program requires function $f!)])
done

AC_CONFIG_FILES([Makefile judge/Makefile judgk/Makefile])
AC_OUTPUT

config_msg_gen () {
	echo "C compiler ........................... $CC"
	echo "C++ compiler ......................... $CXX"
	echo "Kernel C compiler .................... $with_kernel_cc"
	echo "Kernel source ........................ $with_kernel_src"
}

echo ""
config_msg_gen
config_msg_gen > config.msg
echo "The above messages has been written to config.msg"
echo ""
echo "Note: You should build this package with GNU make!"
echo ""
