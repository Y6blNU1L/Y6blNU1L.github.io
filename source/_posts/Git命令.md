---
title: Git命令
date: 2019-09-07 18:40:53
tags: Git命令
---

# Git命令学习笔记

### 创建本地仓库

当前项目目录作为Git仓库，初始化

> `git init`

指定目录作为Git仓库

> `git init 文件名`

初始化后，会在项目目录中会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

创建项目文件

> `mkdir 项目名`

进入文件夹

> `cd runoob`

使用 git clone 拷贝一个 Git 仓库到本地

> `git clone  克隆地址`

```
克隆地址：
	https://github.com/:名字/git上的仓库名.git 
    eg:  https://github.com/hebangan/hebangan.github.io.git
	该方式为SSH
	
克隆完成后，在当前目录下会生成一个 `项目名` 的目录
```

---

### 将项目上传到github项目中

git add 命令可将该文件添加到缓存，**文件名要写全**

> `git add  可多个的文件名`         这个是指定的文件添加到缓存区

```
或者使用 `git add .`  代表这个文件夹下的目录全部都提交添加到缓存区。 
```

git status 命令用于查看项目的当前状态。

> `git status -s`

```
"AM" 状态的意思是这个文件在我们将它添加到缓存之后又有改动。
"A"  状态的意思是这个文件在我们将它添加到缓存之后未改动。

若有改动，只需在执行 `git add` 将其添加到缓存中.
```

git status 以查看在你上次提交之后是否有修改。

> `git status`

```
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
  
  
  		new......

```

 而执行 git commit 将缓存区内容添加到仓库中。

> `git commit -m  "类似于注释"`

再执行 git status

> `git status`

```
On branch master
nothing to commit, working tree clean
```

与Git仓库进行关联

> `git remote add origin 地址`

```
地址：
		git@github.com:名/git上的仓库名.git
```

通过git push 推送到github

> `git push -u origin master`

**注意：**

新建远程仓库如果勾选了 Initialize this repository with a README。那么你通过命令

 ` git push -u origin master是会报错的`

这是由于你新创建的那个仓库里面的README文件不在本地仓库目录中

**这时候执行：**

`git pull --rebase origin master`

**再输入**

`git push -u origin master`

**即可解决failed to push some refs to git的问题！**

---

### 分支管理

**使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作。**

创建分支

> `git branch 分支名`

列出所有分支

> `git branch`

删除分支

> `git branch -d  分支名`

切换分支

> `git checkout  分支名`

创建新分支并立即切换到该分支下

> `git checkout -b  分支名`

合并分支

> `git merge`