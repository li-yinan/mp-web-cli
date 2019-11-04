import path from 'path';
import fs from 'fs';
import shell from 'shelljs';
import webrcDefaultConfig from './config.base';
import mkdirp from 'mkdirp';

export function build() {

    let cwd = process.cwd();
    let webRcPath = path.join(cwd, '.webrc');
    let webrcConfig = webrcDefaultConfig;

    // 读取、解析.webrc
    if (fs.existsSync(webRcPath)) {

        let configStr = fs.readFileSync(webRcPath);
        let config = {};

        try {
            config = JSON.parse(configStr.toString());
        }
        catch (e) {
            console.error('parse .webrc fail');
        }

        webrcConfig = {
            ...webrcConfig,
            ...config
        };
    }

    // 生成临时目录
    let webDistPath = path.join(cwd, '.web', 'dist');
    mkdirp(webDistPath);

    // 处理APP_SOURCE_PATH字段，如果用户没指定就为cwd
    webrcConfig.appSourcePath = webrcConfig.appSourcePath || cwd;

    // 把生成目录指向临时目录
    webrcConfig.appDistPath = webDistPath;

    fs.writeFileSync(webRcPath, JSON.stringify(webrcConfig, null, 4));

    // 调用web化编译流程
    shell.exec(`echo hello --webrc=${webRcPath}`);

    // 对web化的go模板进行渲染，生成html

}
