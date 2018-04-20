---
title: 贪心法求解TSP旅行商问题
tags:
  - TSP
  - 旅行商
  - 最短路径
categories:
  - 算法
  - 贪心法
comments: true
abbrlink: 7f187c1c
date: 2018-04-14 12:39:36
password:
mathjax: true
---

---
![TSP](https://g.gravizo.com/svg?
    graph G {
        label = TSPG;
        rankdir = LR;
       0 -- 1[label = 2];
       0 -- 2[label = 5];
       0 -- 3[label = 6];
       1 -- 2[label = 4];
       1 -- 3[label = 4];
       2 -- 3[label = 2];
     }
 )

算法思路
===
1、首先选择一个起始点（我们称为源点）

2、从源点出发，采用贪心策略，选取连接源点并且权值（cost）最小的点

3、将源点更新为选择的点

4、重复2、3步，直到到达的节点数为终节点数

5、闭合回路，更新路径（path）和开销（cost）

6、将每个节点都做为起始点重复上述步骤，选取cost最小的一条路径

数据结构
===

Node结构体记录节点信息：
---

```cpp
struct Node{
    int node_num;  //节点编号，也可改为string类型。
    bool isselect; //是否被选中。
};
```

二维数组记录节点信息
---

```cpp
G[i][j]:表示由i节点到j节点的权重
```

一维数组记录路径
---

```cpp
minpath[n+1]:由于路径是回路，所以记录的节点为n+1个
```

算法实现（c++）
===

```cpp
/**
* @author Swking
* @method TSP_Greedy
* @parame
*    Node* Np 节点结构体数组
*    int** G 二维数组，储存边的权重
*    int n 节点数
*    int minpath[]  记录路径
* @return mincost 最短路径
*/
int TSP_Greedy(Node* Np, int** G, int n, int minpath[]){
    int mincost = Max; //最短路径
    for(int p=0; p<n; p++){  //每个节点都作为起始点寻找最短路径
        for(int i=0; i<n; i++){
            Np[i].isselect = false;  //每个节点都需要将之前的数据清除
        }
        int path[n+1]; //记录以srcp源点出发的路径
        int srcpcost = 0; //以srcp源点出发的总开销
        int sump = 1; //找到的节点总数（起始点）
        int srcp = p; //记录当前点（起始点）
        Np[p].isselect = true; //将当前点（起始点）置为被选择
        path[sump-1] = Np[p].node_num; //将当前点（起始点）的编号加入被选路径
        while(sump<n){
            int cost = Max; //找出最小cost的比较对象
            int tempp; //记录临时点
            for(int i=0; i<n; i++){
                if(!Np[i].isselect && G[srcp][i] < cost){ //找出连接srcp点的最短路径的点
                    cost = G[srcp][i];
                    tempp = i;
                }
            }
            sump++; //每次循环必定找到一个点
            srcp = tempp; //将当前点更新成找到的点
            srcpcost += cost;
            path[sump-1] = Np[tempp].node_num;
            Np[tempp].isselect = true;
        }
        path[sump] = p; //将源点加入路径
        srcpcost += G[path[sump-1]][path[sump]]; //闭合回路的花费
        if(mincost > srcpcost){ //将mincost修改为最短路径的开销
            mincost = srcpcost;
            for(int i=0; i<=n; i++){  //修改最短路径
               minpath[i] = path[i];
            }
        }
    }
    return mincost;
}

```
时间复杂度
===
寻找一个节点的最短路径为$T1 = O(n^2)$，遍历$n$个节点,所以需要$T2 = O(n)$,总时间为：
$$T(n) = T1 * T2 = O(n^3)$$

---
