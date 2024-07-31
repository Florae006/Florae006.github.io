# 2024牛客暑假多校训练营Day4||补题


## G-Horse Drinks Water

### 题意

将军饮马问题。在平面坐标轴中，只有$x、y$轴的飞负半轴是水源，给出马儿的坐标和营地的坐标，求最短距离。

#### 数据范围

* $1\leq t\leq 10^5$
* $0\leq x_G,y_G,x_T,u_T\leq 10^9$

### 思路

将坐标按坐标轴对称，求距离。

### 代码

```cpp
ld dist(ld r, ld c) {
    return sqrt(r * r + c * c);
}

void solve() {
    ll x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    ld ans1 = dist(1.0 * abs(y1 - y2), 1.0 * (abs(x1) + abs(x2)));
    ld ans2 = dist(1.0 * (abs(y1) + abs(y2)), 1.0 * abs(x1 - x2));
    ld ans = min(ans1, ans2);
    printf("%.12lf\n", ans);
}
```

## H-Yet Another Origami Problem

### 题意

可以选择任意坐标$p$，进行如下二选一操作：

1. 若符合$a_i\leq a_p$，可以重新赋值$a_i\leftarrow a_i + 2(a_p-a_i)$。
2. 若符合$a_i\geq a_p$，可以重新赋值$a_i \leftarrow a_i-a(a_i-a_p)$

可以进行上述操作若干次，求问可以将$a$数组的范围收敛到多小。

#### 数据范围

* $1\leq t\leq 5\times 10^5$
* $1\leq n\leq 10^5$
* $0\leq a_i\leq 10^{16}$

### 思路

上面的操作可以进行无数次，通过模拟可以意识到，这是一个类似折纸的操作，是将某个数沿着某条线折叠到另一边的操作。注意到每次操作不是必须要对每个$a_i$进行这样的翻折的，例如当$a_i\lt a_p$时选择操作2，可以避免$a_i$的翻折。

通过翻折让数组的范围收束到最小。假设当前只有3个各不相同的数，这三个数从小到大排列之后是$\{a,b,c\}$，那么在数轴上形成了距离$x=b-a$和$y=c-b$，对于这三个数来说，通过折叠，假设是$a$沿着$b$向$c$折叠，将$x$变为$x\bmod y$（不断沿着$y$的两边折叠，直到落在$b、c$之间），若此时$x\neq 0$，则$y$也可以通过一样的方法收束到小于$x$的某个长度。故获得的最小的范围应该是$x、y$的$gcd$。

同样的思想可以拓展到多个数的时候。

### 代码

```cpp
ll a[maxn];
void solve() {
    int n;cin >> n;
    for (int i = 0;i < n;i++) { cin >> a[i]; }
    sort(a, a + n);
    if (n == 1) {
        cout << 0 << "\n";
        return;
    }
    if (n == 2) {
        cout << a[1] - a[0] << "\n";
        return;
    }
    ll ans = a[1] - a[0];
    for (int i = 2;i < n;i++) {
        ans = gcd(ans, a[i] - a[i - 1]);
    }
    cout << ans << "\n";
}
```
