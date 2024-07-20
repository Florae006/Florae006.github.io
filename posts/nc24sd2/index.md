# 2024牛客暑假多校训练营Day2||补题




## E-GCD VS XOR

有人卡签到。。。TAT

### 题意

给定正整数$x$，求满足$gcd(x,y)=x\oplus y$的小于$x$的正整数$y$。若无则打印`-1`

#### 数据范围

* $1\leq t\leq 10^4$
* $1\leq x\leq 10^{18}$

### 思路

距离考虑，对于数$x=0b10011010$，考虑异或的性质$A\oplus 0=A,A\oplus A=0$，设$x\oplus y=k$，$y\lt x$，我们直接构造$k$为$x$最右侧的$1$开始的数，这样的$k$可以满足必然为$x$的倍数，同时，若要满足$gcd(x,y)=k$，构造$y$的时候要满足除了$lowbit(x)$以外的数位都与$x$相同。

## 代码

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
















