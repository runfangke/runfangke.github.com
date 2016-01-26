/**
 * Created by JaYa on 2015/12/29.
 */
(function (win) {
    //����baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    /*
     * �ļ�����
     */
    var config = {
        baseUrl: baseUrl,           //�������·��
        paths: {                    //���ĳ��ǰ׺���������ǰ���baseUrlƴ����ô�򵥣�����Ҫ������ָ��
            angular: 'js/angular.min',
            'angular-route': 'js/angular-route',
            text: 'libs/text'             //����requirejs����html���͵�����
        },
        shim: {                     //����û��ʹ��requirejsģ��д������⡣����underscore�����⣬��������һ��ȫ�ֱ���'_'������shim���ڿ��ٶ���һ��ģ�飬��ԭ����ȫ�ֱ���'_'��װ�ھֲ���������Ϊһ��exports����ɸ���ͨrequirejsģ��һ��
            underscore: {
                exports: '_'
            },
            angular: {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular'],   //����ʲôģ��
                exports: 'ngRouteModule'
            }
        }
    };

    require.config(config);

    require(['angular', 'router-cfg-version'], function(angular){
        angular.bootstrap(document, ['webapp']);
    });

})(window);
