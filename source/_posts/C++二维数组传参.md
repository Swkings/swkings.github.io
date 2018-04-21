---
title: C++二维数组传参
tags:
  - 二维数组传参
categories:
  - 代码笔记
  - c++
comments: true
mathjax: false
abbrlink: d88d950a
date: 2018-04-21 12:26:56
password:
---

---

普通传二维数组时我们需要指定维数的大小，也可以省略第一个纬度

```cpp
void fun(int array[3][3]){}
void fun(int array[][3]){}
```

想要传任意维度的二维数组则需要动态创建数组，如下：

```c++
#include <iostream>
using namespace std;
void print(int** G, int n){
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            cout << G[i][j];
        }
    }
}
int main()
{
    int** G = new int* [n]; //*指定指针变量，值为地址
    for(int i=0; i<=n; i++){
        G[i] = new int[n];
    }
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            cin >> G[i][j];
        }
    }
    return 0;
}
```

---
