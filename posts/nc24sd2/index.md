# 2024牛客暑假多校训练营Day2||补题


## B-MST

### 题意

给定一个$n$顶点的带权无向图$G$。

每次询问一个点集$S$，求$S$关于$G$的导出子图的最小生成树的质量，若无则输出`-1`。

#### 数据范围

* $2\leq n\leq 10^5$
* $1\leq m,q\leq 10^5$
* $1\leq w_i \leq 10^9$
* $\sum k_i\leq 10^5$

### 思路





## C-Red Walking on Grid

### 题意

在一个$2\times n$​的网格中，每个格子要么是红色（`R`），要么是白色（`W`）。每次只能踩在当前格子的上下左右相邻的红色格子上，并且在离开当前的格子之后，当前格子将从红色变为白色，提问最长。

#### 数据范围

* $1\leq n\leq 10^6$

### 思路

直接从左往右搜索即可，若当前列有红色格子，则它可以由前一列相邻格子的步数+1转移过来，或者是从下方或上方的红色格子转移过来，两者选更优的解作为答案即可。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll maxn = 1e6 + 50;
const ll mo = 1e9 + 7;

ll n;
char mp[3][maxn];
ll dp[3][maxn] = { 0 };
void solve() {
    cin >> n;
    for (ll i = 1;i <= 2;i++) {
        for (ll j = 1;j <= n;j++)
            cin >> mp[i][j];
    }
    mp[1][0] = mp[2][0] = mp[1][n + 1] = mp[2][n + 1] = 'W';
    ll ans = 0;
    for (ll i = 1;i <= n;i++) {
        if (mp[1][i] == 'R')dp[1][i] = dp[1][i - 1] + 1;
        if (mp[2][i] == 'R')dp[2][i] = dp[2][i - 1] + 1;
        if (mp[1][i] == 'R' && mp[2][i] == 'R') {
            ll tmp = dp[1][i];
            if (dp[1][i] < dp[2][i] + 1) {
                dp[1][i] = dp[2][i] + 1;
            }
            if (dp[2][i] < tmp + 1) {
                dp[2][i] = tmp + 1;
            }
        }
        ll tmp = max(dp[1][i], dp[2][i]);
        ans = max(tmp, ans);
    }
    cout << max(ans - 1, 0ll) << endl;
}

int main() {
    int t = 1;
    // cin >> t;cin.get();
    while (t--)
        solve();

    return 0;
}
```



## E-GCD VS XOR

有人卡签到。。。TAT

### 题意

给定正整数$x$，求满足$gcd(x,y)=x\oplus y$的小于$x$的正整数$y$。若无则打印`-1`

#### 数据范围

* $1\leq t\leq 10^4$
* $1\leq x\leq 10^{18}$

### 思路

距离考虑，对于数$x=0b10011010$，考虑异或的性质$A\oplus 0=A,A\oplus A=0$，设$x\oplus y=k$，$y\lt x$，我们直接构造$k$为$x$最右侧的$1$开始的数，这样的$k$可以满足必然为$x$的倍数，同时，若要满足$gcd(x,y)=k$，构造$y$的时候要满足除了$lowbit(x)$以外的数位都与$x$相同。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll N = 1000001;

ll lowbit(ll x) { return x & -x; }

void solve() {
    ll x;cin >> x;
    ll ans = -1;
    if (lowbit(x) != x) {
        ans = x - lowbit(x);
    }

    cout << ans << "\n";
}

int main() {
    int _ = 1;
    cin >> _;cin.get();
    while (_--)
        solve();

    return 0;
}
```

## H-Instructions Substring

### 题意

有一个操作字符串，由`W`，`S`，`A`，`D`组成，对应上下左右位移一位，从原点$(0,0)$开始，将操作字符串的一个非空连续子段作为选择的操作，问有多少操作可以经过目标点$(x,y)$。

#### 数据范围

* $1\leq n\leq 2\times 10^5$
* $-10^5\leq x,y\leq 10^5$

### 思路

考虑记录每次操作后的坐标$(u,v)$，对该偏移坐标$(\Delta x,\Delta y)$计数，并逐步计算到达目标$(x,y)$需要去除的偏移坐标量$(u-\Delta x,v - \Delta y)$，这个需要去掉的操作数乘以当前的步数坐标（去掉$(u-\Delta x,v-\Delta y)$之后，从当前步开始，之后不管在哪停下，都是有效的路径数目），之后对该偏移坐标数清零，避免重复计数（之后新出现的只在之后的操作中被计数）。

### 代码

```cpp
ll n, x, y;
string st;
map<char, pair<ll, ll>>dxy;
map<ll, map<ll, ll>>mp; // mp[i][j]:x位移量为i,y位移量为j的操作数量。
void solve() {
    cin >> n >> x >> y;
    cin >> st;
    dxy['A'] = { 0,-1 };
    dxy['D'] = { 0,1 };
    dxy['S'] = { -1,0 };
    dxy['W'] = { 1,0 };
    if (!x && !y) {
        cout << n * (n + 1) / 2 << endl;
        return;
    }
    ll ans = 0;
    ll u = 0, v = 0;
    mp[0][0] = 1; // 原点形成的符合{0,0}方案数有1个
    for (ll i = 0;i < n;i++) {
        u += dxy[st[i]].second;
        v += dxy[st[i]].first;
        if (mp.count(u - x)) {
            // u-x:当前走了u步，去掉之前在x轴上走过的u-x步可以到目标x轴
            if (mp[u - x].count(v - y)) {   // 同理
                // 满足去除前面的多余x,y位移，之后的操作都是符合要求的。
                ans += mp[u - x][v - y] * (n - i);
                // 这次使用过去除符合要求的位移的操作方案数目了,之后重新出现的相同位移情况需要重新计数。
                mp[u - x][v - y] = 0;
            }
        }
        mp[u][v]++;
    }

    cout << ans << endl;
}
```

## I-Red Playing Cards

### 题意

对于一个长度为$2\times n$的一维数组，$1$到$n$每个元素恰好出现两次。每次操作可以删掉一个长度不小于$2$的首尾相同的连续子数组，获得该连续子数组的首尾元素值乘以元素数量的分数。为最终可以得到多少分。

#### 数据范围

* $1\leq a_i\leq n\leq 3000$

### 思路

每个数有两个坐标，假设数$i$的坐标为$l_i$和$r_i$，预处理出以数$i$为一个操作时的分数$f(i)$，那么对于区间$[l_i,r_i]$，可以计算其中每个数的贡献（即$i$），若出现满足$l_i\lt l_j \lt r_j\lt r_i $，则用$max(i,j)$代替区间$[l_j,r_j]$的贡献。

计算区间$[l_i,k]$的最大分数$g(k)$，$g(k)$符合：
$$
g(k)= 
\begin{cases}
max(g(k-1) + i,g(l_j-1)+f(j)),& (k=r_j \quad and \quad l_i \lt l_j)\\\\
g(k-1) + i & 
\end{cases}
$$
直到$k=r_i$，得到$f(i)=g(r_i)$。



### 代码

```cpp
void solve() {
    ll n;cin >> n;
    vector<ll>a(2 * n + 3);
    map<ll, plr>idx;
    for (ll i = 2;i <= 2 * n + 1;i++) {
        cin >> a[i];
        if (idx.count(a[i])) {
            idx[a[i]].r = i;
            idx[a[i]].len = idx[a[i]].r - idx[a[i]].l + 1;
        }
        else idx[a[i]].l = i;
    }

    // 用0包裹数组，取0这一对不影响结果，但是方便统计最佳分数
    a[1] = a[2 * n + 2] = 0ll;
    idx[0] = { 1,2 * n + 2,2 * n + 2 }; 

    vector<pair<plr, ll>>idv;
    for (auto i : idx) {
        idv.push_back({ i.second, i.first });
    }
    sort(idv.begin(), idv.end());

    vector<ll>f(n + 1);
    for (auto x : idv) {
        ll i = x.second;
        ll li = x.first.l, ri = x.first.r;

        vector<ll>g(2 * n + 2);
        for (ll k = li;k <= ri;k++) {
            ll j = a[k];
            ll lj = idx[j].l, rj = idx[j].r;
            if (li < lj && k == rj) {
                g[k] = max(g[k - 1] + i, g[lj - 1] + f[j]);
            }
            else {
                g[k] = g[k - 1] + i;
            }
        }
        f[i] = g[ri];
    }
    cout << f[0] << endl;
}
```








