#!/bin/sh

set -x

libtoolize --install --copy
aclocal
autoconf
autoheader
automake --add-missing --copy
automake
