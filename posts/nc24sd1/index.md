# 2024牛客暑假多校训练营Day1||补题




## A-Bit Common

### 题意

计算满足长度为$n$，每个元素小于$2^m$，且存在至少一个子序列满足按位$AND$后是$1$的序列的数量。

答案对正整数$q$取模。

#### 数据范围

* $1\leq n,m\leq 5000$
* $1\leq q\leq 10^9$

### 思路

![按位分析序列的每个数](https://img.dodolalorc.cn/i/2024/07/17/66978bf423ad6.png)

如图按位分析，对于一个长度为$n$的序列，序列中的数分为$k$个末尾是$1$的数和$n-k$个末尾是$0$的数。

* 末尾为$1$的数中，除末位以外的数位（$m-1$位），每一位的组合是$2^k-1$种（要除去全为1的情况）。
* 末尾为$0$的数中，除末位以外数位上的取值是任意的。
* 选择哪些数是末尾$1$需要考虑组合数。

所以，总方案数是：
$$
\binom{n}{k}\times (2^k-1)^{m-1}\times (2^{n-k})^{(m-1)} = \binom{n}{k}\times (2^n-2^{n-k})^{m-1}
$$
最后对$q$取模即可。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll maxn = 5050;

ll qpow(ll a, ll b, ll m) {
    // 快速幂
    ll res = 1;
    while (b) {
        if (b & 1)res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res % m;
}

ll C[maxn][maxn];

void solve() {
    ll n, m, q;
    cin >> n >> m >> q;
    C[0][0] = 1;
    for (ll i = 1;i <= n;i++) {
        C[i][0] = 1, C[i][i] = 1;
        for (ll j = 1;j < i;j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % q;
        }
    }
    ll ans = 0;
    for (ll k = 1;k <= n;k++) {
        ll tmp = C[n][k];
        ll x = (qpow(2, n, q) - qpow(2, n - k, q) + q) % q;
        tmp *= qpow(x, m - 1, q);
        tmp %= q;
        ans = (ans + tmp + q) % q;
    }
    cout << ans % q << "\n";
}

int main() {
    int _ = 1;
    // cin >> _;cin.get();
    while (_--)
        solve();

    return 0;
}
```



## C-Sum of Suffix Sums

### 题意

维护一个初始为空的非负整数序列，支持$q$次如下操作：

每次移除末尾的$t$个整数，然后在末尾假如一个整数$v$，操作后输出当前序列所有后缀和的总和，答案对$10^9+7$取模。

#### 数据范围

* $1\leq q\leq 5\times 10^5$
* $0\leq v\leq 10^9$

### 思路

每个数对后缀和总和的贡献是它当前位置的序号乘以它本身的值，也就是$a_i$的贡献是$a_i\times i$​。根据这个特点和数据范围，我们可以维护后缀和总和。

### 代码

```cpp
void solve() {
    ll q;cin >> q;
    vector<ll>a;
    ll tot = 0;
    while (q--) {
        ll t, v;cin >> t >> v;
        v %= mo;
        for (ll i = 0;i < t;i++) {
            if (a.empty())break;
            ll x = a.back();
            tot -= x * a.size();
            tot = (tot + mo) % mo;
            a.pop_back();
        }
        a.push_back(v);
        ll n = a.size() % mo;
        tot = (tot + v * n % mo + mo) % mo;
        cout << tot << "\n";
    }
}
```







## H-World Finals

签到题。

### 题意

`lzr010506`队伍可以参加46th的WF和47th的WF，这两个WF将同时举行，所以`lzr010506`必须选择其中一个参加。`lzr010506`可以预知每个队伍的在比赛中的成绩（过题数和罚时），排名规则为过题数多优先，过题数相同则罚时少优先。

除了`lzr010506`队伍，还有其他有资格参加两场比赛的队伍。提问，在给出所有队伍的预测成绩之后，`lzr010506`队伍能够获得的最好成绩排名是多少。

#### 数据范围

* $1 \leq number of teams \leq 105$

### 思路

最优情况是，除了`lzr010506`队伍，同时可以参加两场比赛的队伍都参加`lzr010506`队伍没有参加那一场，然后计算最佳排名即可。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

struct team {
    string s;
    ll p, t;
    bool operator<(const team& other)const {
        if (other.p == p)return other.t > t;
        return other.p < p;
    }
};

void solve() {
    ll n;cin >> n;
    vector<team>t46(n);
    map<string, bool>mp46;
    for (ll i = 0;i < n;i++) {
        string s; ll p, t;
        cin >> s >> p >> t;
        t46[i] = { s,p,t };
        mp46[s] = true;
    }
    ll m;cin >> m;
    vector<team>t47(m);
    map<string, bool>both;
    for (ll i = 0;i < m;i++) {
        string s; ll p, t;
        cin >> s >> p >> t;
        t47[i] = { s,p,t };
        if (mp46.count(s)) {
            both[s] = true;
        }
    }
    sort(t46.begin(), t46.end());
    sort(t47.begin(), t47.end());
    string st = "lzr010506";
    ll rk = min(n, m);
    ll cnt = 1;
    for (ll i = 0;i < n;i++) {
        if (t46[i].s == st) {
            rk = min(cnt, rk);
            break;
        }
        if (both.count(t46[i].s))continue;
        cnt++;
    }
    cnt = 1;
    for (ll i = 0;i < m;i++) {
        if (t47[i].s == st) {
            rk = min(cnt, rk);
            break;
        }
        if (both.count(t47[i].s))continue;
        cnt++;
    }
    cout << rk << "\n";
}

int main() {
    int t = 1;
    // cin >> t;cin.get();
    while (t--)
        solve();

    return 0;
}
```

## I-Mirror Maze

补出这题ddl也是死而无憾了。

### 题意

在$n\times m$​的矩阵镜子迷宫里，给出一个点光源，光的传播与镜子的类型`\`、`|`、`-`、`/`有关（[详情戳这](https://ac.nowcoder.com/acm/contest/81596/I)）。

提问经过足够长的时间后，这束光被多少个不同的镜子反射过。

#### 数据范围

* $1\leq n,m \leq 1000$
* $1\leq q\leq 10^5$

### 思路

考虑到光路可逆，在迷宫中的所有可能存在的光路必然是链或者环，不会出现分叉或者是汇集。考虑数据范围$1\leq n,m\leq 1000$和光的方向有上下左右4个，可以通过记忆化搜索来记录已经搜索过的状态，保证每次搜索的复杂度在$n\times m$以内，总复杂度不超过$4\times n\times m$。

具体搜索方法见代码。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

map<pair<ll, char>, ll>redir;

void initRedir() {
    redir[{1, '|'}] = 1;
    redir[{1, '-'}] = 2;
    redir[{1, '/'}] = 4;
    redir[{1, '\\'}] = 3;

    redir[{2, '|'}] = 2;
    redir[{2, '-'}] = 1;
    redir[{2, '/'}] = 3;
    redir[{2, '\\'}] = 4;

    redir[{3, '|'}] = 4;
    redir[{3, '-'}] = 3;
    redir[{3, '/'}] = 2;
    redir[{3, '\\'}] = 1;

    redir[{4, '|'}] = 3;
    redir[{4, '-'}] = 4;
    redir[{4, '/'}] = 1;
    redir[{4, '\\'}] = 2;
}

bool vis[1005][1005][5] = { false }, visp[1005][1005] = { false };
ll n, m;
char maz[1005][1005];
ll mem[1005][1005][5] = { 0 };

ll circlelen;

ll dfs(ll u, ll v, ll dr, ll cnt) {
    if (u<1 || u>n || v<1 || v>m) {
        // 通过边界出射的点是链型光路
        vis[u][v][dr] = false;visp[u][v] = false;
        mem[u][v][dr] = cnt;
        return cnt;
    }
    if (vis[u][v][dr]) {
        // 因为访问过同样状态结束搜索的是环形光路
        vis[u][v][dr] = false;visp[u][v] = false;
        circlelen = cnt;
        return cnt;
    }
    if (mem[u][v][dr])return mem[u][v][dr];

    vis[u][v][dr] = true;

    ll rdr = redir[{dr, maz[u][v]}];

    if (!visp[u][v] && dr != rdr) {
        cnt++;
        visp[u][v] = true;
    }

    if (rdr == 1) cnt = dfs(u - 1, v, 1, cnt);
    else if (rdr == 2) cnt = dfs(u + 1, v, 2, cnt);
    else if (rdr == 3) cnt = dfs(u, v - 1, 3, cnt);
    else cnt = dfs(u, v + 1, 4, cnt);

    // 回溯时复原状态
    vis[u][v][dr] = false;
    visp[u][v] = false;
    // 若是环形光路，在dfs回溯时mem应该记录为环形路径的长度
    if (circlelen)
        mem[u][v][dr] = circlelen;
    return cnt;
}

void solve() {
    cin >> n >> m;
    for (ll i = 1;i <= n;i++) {
        for (ll j = 1;j <= m;j++) {
            cin >> maz[i][j];
        }
    }
    // pre();
    ll q;cin >> q;
    while (q--) {
        ll u, v;string dir;
        cin >> u >> v >> dir;
        ll dr;
        if (dir == "above") { dr = 1;u--; }
        else if (dir == "below") { dr = 2;u++; }
        else if (dir == "left") { dr = 3; v--; }
        else if (dir == "right") { dr = 4; v++; }
        circlelen = 0;
        ll ans = dfs(u, v, dr, 0);
        cout << ans << endl;
    }
}

int main() {
    initRedir();
    int t = 1;
    // cin >> t; cin.get();
    while (t--)
        solve();

    return 0;
}
```
















