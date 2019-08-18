1.分布式版本控制

2.多个开发人员协调工作

3.有效监听谁做的修改

4.本地及远程操



安装git后 git --vesion 查看版本

~~~shell
# 初始化本地git仓库
git init 

# 添加文件
git add <file> 

# 查看状态
git status

# 提交到本地仓库
git commit

# 推送到远程仓库
git push

# 远程拉取数据
git pull

# 远程拷贝仓库
git clone 
~~~



~~~shell
git init 

# 全局配置用户名和邮箱
git config --global user.name ""
git config --global user.email ""

git add *.html

esc :wq退出
~~~



## 忽略不想上传的文件

~~~shell
# 创建一个文件
touch .gitignore

# 在该文件中输入要忽略的文件名 或 文件夹
~~~



## 分支的使用

~~~shell
# 创建login分支
git branch login

# 查看当前状态 可以看到当前所在分支
git status

# 切换到login分支
git checkout login

# 这时候可以对文件进行一些操作
# 比如创建一个文件 写点内容 然后提交
git add .
git commit -m ""


# 现在切换到master
git checkout master
# 会发现刚才创建的文件没了

#创建远程分支login(本地分支push到远程)
git push origin login
可参考https://www.cnblogs.com/springbarley/archive/2012/11/03/2752984.html

# 删除远程分支
git push origin :test 
#删除本地分支
git branch -d 分支名（remotes/origin/分支名）
#强制删本地
git branch -D 分支名
~~~

git 拉取远程分支到本地   [地址](https://blog.csdn.net/carfge/article/details/79691360)





## 主线及分支的合并

~~~shell
# 在master中 进行合并分支操作
git merge login
~~~



## 操作远程仓库

~~~shell
# 首先要在远程中创建仓库
# 查看远程是否有对应的地址
git remote

# 注意远程创建仓库的帮助提示
git remote add origin ...

# 查看是否连接上
git remote
# 会提示origin

# 推到远程
git push -u origin master
~~~



