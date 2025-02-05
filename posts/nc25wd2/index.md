# 2025牛客暑寒假多校训练营Day2


## A 一起奏响历史之音！

### 题意

中国传统五声调中包含 1、2、3、5、6，判断一个乐谱是否仅由全部或部分五声调铺成。

### 思路

按题意判断即可。

### 代码

```cpp
void solve() {
  bool flag = true;
  set<ll> st = {1, 2, 3, 5, 6};
  ll x;
  while (cin >> x) {
    if (st.find(x) == st.end()) {
      flag = false;
    }
  }
  if (flag) {
    cout << "YES\n";
  } else {
    cout << "NO\n";
  }
}
```

## B 能去你家蹭口饭吃吗

### 题意

给出一个数组$a$，找到一个整数，要求整数尽可能大，但是至少要比数组中一半数量的数小。

#### 数据范围

- $1\leq n\leq 5e5$
- $1\leq a_i\leq 1e6$

### 思路

如果数组长度为奇数，则取中位数-1，即$a[n-n/2]-1$。
如果数组长度为偶数，则取下标更大的中位数-1，即$a[n/2+1]-1$。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
  }
  sort(a + 1, a + 1 + n);
  if (n & 1)
    cout << a[n - n / 2] - 1 << '\n';
  else
    cout << a[n / 2 + 1] - 1 << '\n';
}
```

## D 字符串里串

### 题意

定义字符串$s$的可爱度$k$：最大的满足存在长度为$k$的连续子串$a$和严格不连续子串$b$，使得$a=b$。

给出字符串$s$，求其可爱度。

#### 数据范围

- $3\leq m \leq 2e5$

### 思路

$b$是不连续子串，可以设计$a$和$b$仅最后一位或开头一位的在原串中的位置不同，那么只需要寻找符合条件的数量大于等于 2 的字母，并比较分别去掉两端得到的最长的串的长度。

### 代码

```cpp
void solve() {
  ll n;
  string s;
  cin >> n >> s;
  s = " " + s;
  map<char, vector<ll>> mp;
  for (ll i = 1; i <= n; i++) {
    char c = s[i];
    mp[c].push_back(i);
  }
  ll ans = 0;
  for (auto [c, v] : mp) {
    if (v.size() >= 2) {
      ll m = v.size();
      ans = max(ans, v[m - 2]);
    }
  }
  for (auto [c, v] : mp) {
    if (v.size() >= 2) {
      ll m = v.size();
      ans = max(ans, n - v[1] + 1);
    }
  }
  cout << ans << '\n';
}
```

## C 字符串外串

### 题意

定义字符串$s$的可爱度$k$：最大的满足存在长度为$k$的连续子串$a$和严格不连续子串$b$，使得$a=b$。构造长度为$n$的由小写字母组成的字符串，使其可爱度为$m$，或报告没有这样的合法字符串。

#### 数据范围

- $3\leq m\leq n\leq n\leq 2e5$

### 思路

$a,b$两种字符串至少要有 1 位对应原串的位置不同，当$n=m$时显然无解。
设字符串$t$是$a,b$左端对齐之后公共的部分，长度为$m-1$，小写字母只有 26 个，当$n-m\gt 26$时，不管怎么填后$n-m$的字母，都不可能与让所有在$i\geq m$的范围内的字母只出现一次，出现多次则可爱度会增加。按照这样的思路构造前$m-1$长度的字符串，并保证在后一半的部分中字符$s[m-1]$出现且仅出现一次。

### 代码

```cpp
void solve() {
  ll n, m;
  cin >> n >> m;
  if (n - m < 1) {
    cout << "NO\n";
    return;
  }
  string s;
  if (m == n - 1) {
    for (ll i = 1; i <= n; i++) {
      if (i == n - 1 || i == n) {
        s.push_back('b');
      } else {
        s.push_back('a');
      }
    }
  } else if (n - m <= 26) {
    for (ll i = 0; i < n; i++) {
      s.push_back('a' + i % 26);
    }
    s.back() = s[m - 1];
  } else {
    cout << "NO\n";
    return;
  }
  cout << "YES\n" << s << '\n';
}
```

## E

### 题意

#### 数据范围

### 思路

### 代码

## F 一起找神秘的数！

### 题意

在区间$[l,r]$中找到两个数$x,y$，使之满足$x+y=(x\ordinarycolon y)+(x \land y)+(x \oplus y)$，求这样的数对的数量。

#### 数据范围

- $1\leq T \leq 2e5$
- $0\leq l\leq r\leq 1e18$

### 思路

打表猜结论，发现只有$x=y$时等式成立。

### 代码

```cpp
void solve() {
  ll l, r;
  cin >> l >> r;
  cout << r - l + 1 << '\n';
}
```

## G 一起铸最好的剑！

### 题意

在$m$的幂次中找到最接近$n$的数。

#### 数据范围

- $1\leq T \leq 1e5$
- $1\leq n,m\leq 1e9$

### 思路

模拟。

### 代码

```cpp
void solve() {
  ll n, m;
  cin >> n >> m;
  if (m == 1) {
    cout << "1\n";
    return;
  }
  p[0] = 1, p[1] = m;
  ll pi = 1;
  ll mx = abs(p[pi] - n);
  ll i = 1;
  for (; p[i] <= n; i++) {
    if (abs(p[i] - n) < mx) {
      pi = i;
      mx = abs(p[i] - n);
    }
    p[i + 1] = p[i] * m;
  }
  if (abs(p[i] - n) < mx) {
    pi = i;
    mx = abs(p[i] - n);
  }
  cout << pi << '\n';
}
```

## H 一起画很大的圆！

### 题意

在矩形的边界上找三个不共线的点，使得过这三个点确定的圆的面积最大。

#### 数据范围

- $-1e6\leq a,b,c,d\leq 1e6$

### 思路

合适的点的候选在矩形的四个直角附近一个单位长度的点中选，暴力枚举三个点，并判断取半径最大的圆。

### 代码

```cpp
ld getcir2(pll p1, pll p2, pll p3) {
  auto [x1, y1] = p1;
  auto [x2, y2] = p2;
  auto [x3, y3] = p3;
  ld r;
  ld a = x1 - x2, b = y1 - y2, c = x1 - x3, d = y1 - y3;
  ld e = ((x1 * x1 - x2 * x2) + (y1 * y1 - y2 * y2)) / 2.0;
  ld f = ((x1 * x1 - x3 * x3) + (y1 * y1 - y3 * y3)) / 2.0;
  ld det = b * c - a * d;
  if (fabs(det) < 1e-5) {
    r = -1;
    return r;
  }
  ld x0 = -(d * e - b * f) / det;
  ld y0 = -(a * f - c * e) / det;
  r = hypot(x1 - x0, y1 - y0);
  return r;
}

void solve() {
  ll a, b, c, d;
  cin >> a >> b >> c >> d;
  vector<pll> v = {
      {a, c}, {a + 1, c}, {a, c + 1}, {a, d}, {a + 1, d}, {a, d - 1},
      {b, c}, {b - 1, c}, {b, c + 1}, {b, d}, {b - 1, d}, {b, d - 1},
  };
  pll p1 = {a, c}, p2 = {a + 1, c}, p3 = {a, c + 1};
  ld r = getcir2(p1, p2, p3);
  for (ll i = 0; i < (ll)v.size(); i++) {
    for (ll j = 0; j < (ll)v.size(); j++) {
      for (ll k = 0; k < (ll)v.size(); k++) {
        ld ri = getcir2(v[i], v[j], v[k]);
        if (ri != -1 && r < ri) {
          r = ri;
          p1 = v[i], p2 = v[j], p3 = v[k];
        }
      }
    }
  }
  cout << p1.first << ' ' << p1.second << '\n';
  cout << p2.first << ' ' << p2.second << '\n';
  cout << p3.first << ' ' << p3.second << '\n';
}

```

## I

### 题意

#### 数据范围

### 思路

### 代码

## J 数据时间？

### 题意

有$n$个数据，每条数据由`user_id`、`login_date`、`login_time`组成，表示员工号，登录日期和登录时间。员工号是不超过$1e20$的整数，登录日期是一个`YYYY-MM-DD`模式的日期，登录时间是`hh:mm:ss`模式的时间。
现在查询`h`年`m`月的员工在通勤时间（`07:00:00-09:00:00`和`18:00:00-20:00:00`）、午休时间（`11:00:00-13:00:00`）和临睡时间（`22:00:00-01:00:00`）的登录人次情况，同一个人在同一个时间段的多次登录算作一人次。时间段均包含边界。

#### 数据范围

- $1\leq n\leq 1e5$
- $2000\leq h\leq 2030;1\leq m\leq 12$
- $1\leq user_{id}\leq 10^{20}$
- 日期和时间的格式如题意所述。

### 思路

按题意模拟。

### 代码

```cpp
void solve() {
  ll n, h, m;
  cin >> n >> h >> m;
  map<string, vector<pair<string, string>>> mp;
  map<string, bool> mp1, mp2, mp3;
  for (ll i = 1; i <= n; i++) {
    string id, t;
    ll dy, dm, dd;
    char c;
    cin >> id >> dy >> c >> dm >> c >> dd >> t;
    if (dy == h && dm == m) {
      string s = t;
      ll st = ((s[0] - '0') * 10 + (s[1] - '0')) * 3600 +
              ((s[3] - '0') * 10 + (s[4] - '0')) * 60 + (s[6] - '0') * 10 +
              (s[7] - '0');
      if ((st >= 7 * 3600 && st <= 9 * 3600)||(st >= 18 * 3600 && st <= 20 * 3600)) {
        mp1[id] = true;
      } else if (st >= 11 * 3600 && st <= 13 * 3600) {
        mp2[id] = true;
      } else if ((st >= 22 * 3600 && st <= 24 * 3600) ||
                 (st >= 0 * 3600 && st <= 1 * 3600)) {
        mp3[id] = true;
      }
    }
  }
  cout << mp1.size() << ' ' << mp2.size() << ' ' << mp3.size() << '\n';
}
```

## K 可以分开吗？

### 题意

有一块$n\times m$的方块组成的矩阵，其中有一些蓝色方块，其余为灰色方块，定义两块方块的连通的：只有当两块方块在四连通方向有共边。
当一个蓝色极大连通块可以脱离矩阵时，其任何蓝色方块不与任何灰色方块有共边。现在先在矩阵中通过移除灰色方块，取出一个蓝色极大连通块，求最少的操作次数。

#### 数据范围

- $1\leq n,m\leq 500$

### 思路

并查集。
遍历所有的蓝色方块，并查集维护每个蓝色方块寻找它属于的蓝色极大连通块，再通过遍历这些连通块的每个小方块的周围四格，统计需要敲掉的灰色方块的数量。

### 代码

```cpp
ll n, m;
ll a[maxn], b[maxn];
ll fa[maxn];
char maz[600][600];

ll find(ll x) {
  if (fa[x] == x) {
    return x;
  }
  return fa[x] = find(fa[x]);
}
void merge(ll u, ll v) {
  ll fu = find(u), fv = find(v);
  if (fu == fv) {
    return;
  }
  fa[fu] = fv;
}
vector<pll> dxy = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

void solve() {
  cin >> n >> m;

  for (ll i = 0; i <= (n + 5) * (m + 5); i++) {
    fa[i] = i;
  }

  vector<pll> v;
  for (ll i = 1; i <= n; i++) {
    for (ll j = 1; j <= m; j++) {
      cin >> maz[i][j];
      if (maz[i][j] == '1') {
        v.push_back({i, j});
      }
    }
  }

  // 并查集
  for (auto [x, y] : v) {
    for (auto [dx, dy] : dxy) {
      ll px = dx + x, py = dy + y;
      if (maz[px][py] == '1') {
        merge((px - 1) * m + py, (x - 1) * m + y);
      }
    }
  }
  map<ll, vector<pll>> mp;
  for (auto i : v) {
    ll x = (i.first - 1) * m + i.second;
    ll fx = find(x);
    mp[fx].push_back(i);
  }

  ll res = n * m - v.size();
  for (auto [i, vi] : mp) {
    set<pll> st;
    for (auto [x, y] : vi) {
      for (auto [dx, dy] : dxy) {
        ll px = dx + x, py = dy + y;
        if (px < 1 || px > n || py < 1 || py > m)
          continue;
        if (maz[px][py] == '0') {
          st.insert({px, py});
        }
      }
    }
    res = min(res, (ll)st.size());
  }
  cout << res << '\n';
}
```

