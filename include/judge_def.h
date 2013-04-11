#ifndef JUDGE_DEF_H
#define JUDGE_DEF_H

#define JUDGE_AC 0
#define JUDGE_WA 1
#define JUDGE_TLE 2
#define JUDGE_MLE 3
#define JUDGE_RF 4
#define JUDGE_RE 5
#define JUDGE_CE 6
#define JUDGE_ERR 7
#define JUDGE_WAIT 100
#define JUDGE_RUN 101

#define JUDGE_CPP 0x1
#define JUDGE_JAVA 0x2
#define JUDGE_PASCEL 0x4

#define JUDGE_SUB_PARAMMAX 4096
#define JUDGE_SET_FILEMAX 65536
#define JUDGE_SET_DATAMAX 4096
#define JUDGE_RES_DATAMAX 65536

#define DLL_PUBLIC extern "C" __attribute__ ((visibility ("default")))

#define IOCTL_PROC_ADD _IOWR('x',0x0,int)
#define IOCTL_PROC_GET _IOWR('x',0x1,int)
#define IOCTL_PROC_DEL _IOR('x',0x3,int)

#define IOCTL_HYPERIO_ADD _IOWR('x',0x10,int)
#define IOCTL_HYPERIO_READ _IOWR('x',0x11,int)
#define IOCTL_HYPERIO_WRITE _IOWR('x',0x12,int)
#define IOCTL_HYPERIO_DEL _IOWR('x',0x13,int)

#define JUDGK_COM_HYPERIO_BUFSIZE 4194304

struct judgk_com_proc_add{
    char run_path[PATH_MAX + 1];
    pid_t pid;
    unsigned long kern_task;
    unsigned long timelimit;
    unsigned long hardtimelimit;
    unsigned long memlimit;
};
struct judgk_com_proc_get{
    unsigned long kern_task;
    int status;
    unsigned long runtime;
    unsigned long memory;
};

#endif
