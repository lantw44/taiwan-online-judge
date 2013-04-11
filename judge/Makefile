all:
	g++ -I../include -g -rdynamic -fvisibility=hidden -O2 center_server.cpp center_manage.cpp center_judge.cpp tool.cpp event_exec.cpp -ldl -lpq -ltar -lbz2 -ljson -lcurl -pthread -o center_server
	g++ -I../include -g -O2 judge_server.cpp judge_manage.cpp tool.cpp -ldl -lbz2 -ltar -pthread -o judge_server
	g++ -shared -fPIC -fvisibility=hidden -O2 -I../include jmod_test_manage.cpp -ldl -ljson -pthread -o jmod_test_manage.so
	g++ -shared -fPIC -fvisibility=hidden -O2 -I../include jmod_test_line.cpp -ljson -pthread -o jmod_test_line.so 
	g++ -shared -fPIC -fvisibility=hidden -O2 -I../include jmod_test_check.cpp -o jmod_test_check.so
