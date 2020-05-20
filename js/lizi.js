window.onload = function() {
            //����
            var config = {
                vx: 4, //С��x���ٶ�,��Ϊ�ң���Ϊ��
                vy: 4, //С��y���ٶ�
                height: 2, //С��߿�����ʵΪ�����Σ����Բ���̫��
                width: 2,
                count: 200, //�����
                color: "121, 162, 185", //����ɫ
                stroke: "130,255,255", //������ɫ
                dist: 6000, //����������
                e_dist: 20000, //����������پ���
                max_conn: 10 //�㵽�����������
            }

            //����
            CanvasParticle(config);