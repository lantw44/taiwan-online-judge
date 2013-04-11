ifneq ($(KERNELRELEASE),)
	judgk-objs := judgk_mod.o judgk_proc.o judgk_syscall.o judgk_syscall_asm.o judgk_security.o judgk_hyperio.o
	obj-m := judgk.o
else
	judgk_source=$(shell pwd)
	judgk_include=-I$(judgk_source)/../include
	linux_version=$(shell uname -r)
	linux_source=/lib/modules/$(linux_version)/build

all:
	${MAKE} -C ${linux_source} M=${judgk_source} EXTRA_CFLAGS=$(judgk_include) modules
clean:
	${MAKE} -C ${linux_source} SUBDIRS=${judgk_source} clean

endif
