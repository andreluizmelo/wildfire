package com.example.philippe.tapegandofogo;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class APIService {

    public List<Registro> GetAllAlerts(){
        List<Registro> list = new ArrayList<Registro>();
        Registro r = new Registro();
        r.setOrigin("nasa");
        r.setType("fire");
        r.setLongitude(-43.1997803);
        r.setLatitude(-22.8948792);
        r.setDescription("fire reported");
        list.add(r);

        Registro r1 = new Registro();

        r1.setType("fire");
        r1.setOrigin("nasa");
        r1.setLongitude(-43.1951803);
        r1.setLatitude(-22.8535492);
        r1.setDescription("fire reported");
        list.add(r1);


        Registro r2 = new Registro();
        r2.setType("fire");
        r2.setOrigin("nasa");
        r2.setLongitude(-43.1998803);
        r2.setLatitude(-22.8138892);
        r2.setDescription("fire reported");
        list.add(r2);


        Registro r3 = new Registro();

        r3.setThumb("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4goUES06+VGCWgAAGaBJREFUeNrtm3mUXVWd7z9773PuXGNqSM2pqpCQeQYDRiAhQEAjBEVQQQQU0fahdms7tNqr0cYBHBC1G4covHZYIAQj2BhEIAkkYYwJISFDVZIaUvNw5zPs/f649xYJqUoIsF6/tR6/lVP3nnv22Xv/vvs37x14m96mt+ltepveprfp/1cSb3WHLY1NHDh0kJamJgRgDAghMMZw4NDB/2l+/y8A0NSEFBJjNEIoYYwWCDQGCRhjjEEbhJKC/A9CCBLpFLFQBIPBaI2UCmM0Bw4f+n8fgCkNjbQfPkRr0xQMhtyaI4UQvjEGQAF+vrkFGMA3xiCEUPl5+LVT6kxXe2fhXufbmTxQgOHAobcWEPVmO2hpbEJKydDIMOWlpUIgJLlVFcAvgC6gA3inwQwKRCbPVCkQEkKk88wy2DOAspQpMK+1Rghh5RAVCCEoLy2lvLSU0pJihkdG/mcBaGlsyq01UF5aKvKMGSFE1BhTKoS4Hvg3YABYIhA/BSYDcaBFCLEBOAuoB/YpS/0T8CkgCmS1rwellH6+38J8ZX4MyktLKSspYehNAPGmVKC1aUrhqwSjQdQBYeBcYDW51b8x36YXqDrq9W6g5qj7TiADtObvfWA3sAnYAGzM94GUUmitJa+qVc5evAH1eMMAtDROQZA38UKA1sUIsQ34ObAcuAgYBMrIibTKfxa+FySmoOvWUYzD8dI5CDwK/Eop9Wff9xFCiLyNMQBaa9pO0WieFICGhrqjb+XRE7eFhRBC+b6vlVJ/Ai4GdgHN5CThaDKvGW+8e5Mf4+h7nW93NCBPAXdIqX7v+x5CCLF/qN00lNSRN6wYY+jo6HpzABSY7+zooXpyhezuPqILz5YtXSgPHe5TSkpXCPE+4F7ABezxmCwICogJBzX5v8YUrP5xjwtgFEB6yBjzASugMhe8c4GpqS4z//GbPytjjJfNZgiFwhw+3HlCAOSJHhZcj1ZKDAzHNTljdSbQsvHpF/TBjsOugdnAT8iJrgVoKQRSSpSUorAajuuRSmdJJNOMJlKMvOYaTaRIJNOk0lkc18MYg5QCJSWygNyrRlDnwb5ESbn2lX0H/GuvXKF37DloDnf3ey2N1WQyGTzPp76+7kQsjundiYRE4mV1UVnRLbMWTP9cS0NN5EjfYPbZHfse7e/ru9ZW6kJf60oppQso3/dF2nHxPB8D2JYiGglROSlKeWkRZSUximNhwqEgtp2Tas/zSWUc4vEUgyMJBobiDI8kSKQy+FpjKUUwYGEphcGgtZGAlEL4jue/v6Ki8sFrPvu9Stf1dSwSWtfSUPO9fe3dRmtDLhZ9gwAIIZQx2hfSPmv2tKZ/+fYXPko0EtRam+CGzS9ecufd6zf4Wh8xxph4Mq0EUByLMKW+mqb6SuprKqivqWByZSmlxTHCoQCWpXLqMI58G2PyYGQZGk7QcWSAvW1d7N7XQXtHD6PxFFJKQsEAtq1IJjOqYlKx+eQ1q1bPmtaE1prfrn/i7PsfebpkdHjoq83NjcpxPP9EPJ5MAkTADqAC1hkzpzb6vta6b3DUfumVg8yf0ezffO1753/9e//FlLpqzlwwXcyf1cL01jqqJ5USCgWAnGX2PB/P12Qdl0zWYaIlETnQsS2L2upymuqqWLZkJlnHpbt3iB2729n24ivs3t9B/9Ao01vr+PS17xGnt9b76/+6lUtXLtUfv/IiuWNP+3U7h4e+sXjetOyW514uGO03qAICfNfrGBiOq4GhOI9sfI5X2jrZvb9DtXX06EtWLBHXXr5CVFWUApDJOjiOR9Z18yudM36FSK4QOJ2ICjYj67hjgXVVRSmrli/mgnMW0tndz3/98XHaDvfgOB6PPbVd7T94hK7eQeF5vsiro7l33aOv9WLH0YSRYH1NDUIKY1tKDA4Mdjm+uX7BzJbo0vkzTCbrinUbtnDV6nPETR9aJYwxxBMpXM8nHAwQi0VQSuG5/hjzp0oi9yLGGIIBm0g4hCB3X1FWzKpzFlE5qZTfrH+C7S+3UVtdTiqT9dsO96i/PrX9Addx7p/a2qRcz9eTSsoYHh0/WpxwZq1NU3C0ixTCWjR3oX74b49dsXBW629vuOJC86s/bKC8OCxaGieza18nnhYgJEoKbGWonlTE0gUzWDBnOq7nk3VclDyhwzmOtDYoJYmGgxzsOMLWF3ax/3APiZSDpw0SQ01VKZ7rsmHTi3z4spXmonMW8/lv/cJ7fvvueS2Njfs84xuD8QLSnjAdHxeAQozvag9bWigpGY4nyGp3dVEk/LuysrLg8uXLxex5C8W8uXOpr6sjVhRDIOjuPsK2Z7ax4ZE/4yf7uGr1MiZXlJNMpZGvEwStNaFggKzjct+fN9N2JMHcBUtYtHgxLS0tlJaWon2fjs4uDuzfy1ObN/HEk0/4tjTiYFffhyN28LexcBiNwRiNFLlx9x9sf30ANDc2IoUUQggDxLTRX7CUVa4sVZx1nCvPPONMa+asWSIWiwLg+z5aawRgWTaBYID4aJx7/3A/meQI//TxNcw5fQqpdOakIGhtCAVtunuHuP1nD3DoyBDvueRi6uvqCARyhjVXaxBYloWQknQ6w9atW9iydatfEiv6jeu6I57vZQXiDiHFIZNzm/pUAbC01p4Q4utSyn/NZDI4joMxhkw6TTqTRo/TSSF+VUBZaSmup6msmMR3v3o9NVVlOI47oU0wxqCUIpN1+PK372bX7jYiYZuR0TiOO773KMTO0UiUUCiE0ZpAMEgkEsH3/fU9/b2rJ1dWK8AfD4BxvUBeZAyAZVnvGI2Puuecd56/YsUKOxgIqkAwkI/OBFr7Y6GGUmoMDWNylZ1MJs03brmVO9au41tfvO6Eq2+MIRwM8KNf/ZFXDnTwuX+8mWnTT0dIkZtToW9t0DqXQwkpkVKitcb3PCzL9h7+88Pm4Yce6i0vLZtVFI3ZAuEazLjucEI3KIQwwWCQTCYTKCsvt7/wxS/KuXPnKkudWgnB931++P0f0tmf4Onnd7FsyWziyfRxRlFrQyQc4oVd+9jfPUJpcYzVl17KgoULT2k8wFp54QXm2WefmZyKJ/sXLVqkXtj+ohsOhMZtPKFCer4ndu/bS/9A//7lK5bT1NhoMuk0vu/jeR6e6wLwwAP384kbP84PfvB9Uslk7tlRVyaT4X995ma+9rWv8/iWHViWwrYUlpJYSo1dSkki4SB/3fwC73vfFVx51ZUUl5Tg+z6u6459ArS1tfGVL3+Jm2/+NNtffBGt9VibbDZLeXm5vuyyNaq3r+8vV37gKlcKIZkgGBoXgKSTIhgKCgBlK71w0SJs2yYSyfl3IQSWbXPHHT+kvaObwZFRPvvZz3H3PXfnDFPeQCmliEajnHveeSxauJCheJb97V2MxFMMDMePuYZHkxzs7KWjZ5jp06Zx6Zo1tLa2opTCtm2klFiWxd69e7n9+9+nrnkqd9xxJ5+46UYymQyWZY21McaY81eejx20/T17X/ErKirkvh+3jS8u4/1oK4v3vudS/zvfu42qqqoFU3KVHyGlHMu3AR58cB3KCmCMpqgoyt69e4FXU9lC2/a2dhzHwQqE2b7rADXVlbjuq8bQGINlKYZG4nhaMTgwQCaVZNHixWPRo9YapRTbt7/Ig+vuZ3R0hKamBnp7+0gmk0QikXwGKQFkzeQaGhoalqz91Vrx6COPeo0X179+ABCC73zvNgOQSqVjiUQCy7LGTHeBwas++CE+dsPHiEZCCCm5+OJL8q+LYz4n10xmxsyZ/GLtz5kxtY4ZpzWTTGeO8QbhYID2jm4ef/4AF1x4Ad3d3cf0UQB/2bJ3UVxUxD2/vhvLklx11VVUVFTkjWKu3TPPPENPTw81NTWxnS/tsk+fPcPh1ULO6wAgDwNgBgYGnC1bt3LxJZeMMa6UwhjDDdffQHlZGRs2bGDlygtYsWLFmCs7mrTWZDIZ0qkEUirSWQfbslAqx1Q265JIZQCB62QZHh7GyTqvWZNcGFxdXc369X/iZz/7GbZtc/PNnxkDyfd9pJQ88cQTTJ06Fa21D2ghxIQ5wbgAGGMoLy2Tg8NDvhCiY/PmzfOTyaQpKioaC2QKg65Zczlr1lx+jMi/loLBIN3dR0jGh2morSKVzvD33W30DYwQi4aZ1lxHfU0lxbEonpOmt7ePSDh0XFWoAEJLSyu33vqt454VFmbbtm1m2rRp9PT0HAG8a6/5iHj0sQ3jGsFxARBCEAwFBEAsFtu4c8eOd7e1tZk5c+YcNynffzXdLkzgKCQxQCwa5cGHHqahspjRZIZ//tZaklmf4qIiUqkUjpPhpg9exOqVSykKW2zZupXzl5+H4ziEQse7L9/3MVpDvvJUsBFSSg62t9PZ2WkGBwdpa2t7RgjBxk1PKsfJeuPxOqEbtC3LANTW1GwdHBriscf+Jj3POyatLVj7wvXaZyI/uZHROPff93tWr1zKHzc8Tc9gnIVzZ7No/lwWL5hLMBhi7b1/YcfuNtZctIzHH9vA4OAgjuMc32d+pS3bHrP8hd+EEDywbh2BQEA8++w2kqn0jtraybiuSyQSff0qoLXGVnYuEpSqLxoJ6+9+9ztywfx5pqGhQcRiMXytx6nrGnxfEwgEiEQjKCkxwA9+8H22bXmaQwdeYX97F0IINj29hZrJ1fT1DdDZ1Ynrenzw099k1blLGOjp55dr11JXX4/rOPhak81k8pHm8SpWkIZUMskt/3aLbm1tUZs2buoqjRU9ZzBYUmnHc8cFYMJ0uKGhTh4+3KmnT2+dMTQ4unN4aFhefMnFXHfddXieR2VlFVIKcnU3gJz+lxSX0NXdxdat29i0aSO7d++mo6MDfeLS3Jh+A9i2hdaaxYuWcPZZZ7HsXcuY2jqV0fhoPukSx8xea41t29x+++2s/+N6PxKLquKi2O9aapuu3tfZZoIy4KfcNF1dR3jd1NBQpwAqqqrOnTd7mrEt5ZeUlJjt27ebeDxu+gf6jdbavJZuu+02M2PGDGPbViEvGruUlEZJedzvhUvmss9j31HKtLa2mltvvdWciAYGBkxxcbERQrgrzznDTG2d8otV71pBa0uTNaP5tNfP+FEAWABC2Zdf8/6LTGtTrQeY6dOnm/vuu8/sfGmX6ejoMCMjI8bzPGOMMTfeeONxDAghTHNjjVkyb/prGJOmpKTYTJo0yYRDobHf58xoMa1NtUaMA8bVV19t0un0ccx7nmdWrVplANM6pc775e1fMHV1tQ811zeyaP4sdaKy2Lg2oKam+lX98t1JjXVVVF10trntP+9lz549XH/dtVx0wXIC4WKsQBDbsmg7cIANGzaMvbdk3nQuvfBsGmqraKqvJmjb/GXjc2x6Zhf7D3Xxkes+xkB/P5dddhkv797Db375Y65YvZx5M5oRwMHOXg519rDukc1se3E3APfccw8HDhxgzty5FBeXEA6H0L7L448/ycaNGwG47MKzqSwvAShq6zjE0iUrTU//0KkBEAqF8Lyc15B2sNQYWLNqGT+9Zz2ZrEs266DTQyxb3EI4FOAPDz/Jhg1bsCzFgllTuenq1cw5vRnbtnA9D8dx8XyfVect4dILzuazt/yUOXPmEbAlp02dyp69+5k9vZGLz11Cx5E+pJRMb6ln9rQprFy2iJ172vnx3Q/yws59bN68mZhKs+yMuXQdGOBPjz7Noa5+lJQUF0VYvXKpGBiOEw4FogA33/Rh8+QzX54QgHHd4PXXXzoW0AQCgRIlJTVV5dx09epcVub53PvQRu789Xp6B+L0DyVzbghBc0MNzQ2T0VozNBwnk3HG6gXJZAZf+7xj/nT+8667eOrpbfz4P+7ivnt/x9KFs+gfGhkzcJmsw9BIHG0MdZMrqJ9cgRC5WCOZdpHK4oktO+jsGSIYsPG15h+uvYxJZcUIwLatMMCn3/0Rc6Ka7LjJ/Z49B7GUksMjozocCb93xVnzz6yvrtCzpzfLriP97Nl/GNtSdPcO8Jcnn+VQV2+uAGI0L73SzkOPbWXF2QspLy3C8/yc68pvdWUdjxmnNeGkhtm9awcj/R2sXDqTeTOnks06CCHzzQ3RSIhDnb18+DO3sn3XfowxaG041NXLXzc/T9/AMEpKXM/jfRe/i09c/R7iibTxfF889tT2eG/fwE8SPjpYUixGR+OvXwVAIFVOOJRSkYBtgYBkKsNXb76art4Bnt+xF9uy0EajtckDAEpJ+gdH+NS/3MG3v/QxZkxtJJXJoqychOT/ceXq5dhWbvhEMkUylSFg56q3nu8TjYT5+8sH+NK3fs7IaBKlJL6fS3iEEGP7ho7rcdaiWXzxU1cRT6RyQZJSKKVsQA0b32tsbDw1FRBCYOVjfiVl2LYURhtc18PXmlv/+QZqqibheh6+r48Jf30/t5fX0d3HT+7+I47nk85kGRlN0j80Sk/fED39w9z1mz/xle/8gl/f9wh727vpHxplcCRBPJnG83x8X3Pnr9dxpG8QSym0zkmQpWSummTAcT1qqyfxjc9/FNfzCvMQUgqkFBagckeQJqYJs0Erd1YHKUUwGLAJhwIIkYsAG2or+eQ1q7nv4Y3sa+8kmUof866Xzw82P7uTKz75TWKxGI7rjVWPDdB9pBfXyRKORGlpbsLk9wFsWxGNhBkcGOCl3ftyhtTNGWRjQOczWikV7z7/Hbzn/KVUV5bRNzCCkGIsIZNCSk6y+z0hADkEJRUVFVhKqYzj8uKuNna80s6hzj4Od/czOJIgnfWJFRWRSqeP2YNVUhIJ20ghGBjoJ5vNoCwbI9RY6Fk2qQKEpKw4huvmcgxfa5KpDAfaDjM8nHNdBeYry4uprSpjVmstK5bNY8fOA/y9fQBtJK+0dVFbVUYgYON5PpmsgxBIIVAnCUDHB8DzDKl0Vvf19VFfXz/5jrXrGUmkRDbrgHhVDG3bQkiLcDhKJpNGCoHBUFVezGUXLcPXObuA0ezZ385zuw4RDoWwLIv6qKAsajHseQxmfVzXIZlMkkgkctUi4Pyz5rB6+ULOmj+VlrpKwgGLYFEEXA/efy7L3vdVPvfvv+S0KXXUVZcxf2YzZ8w9LQeGbVnGnPwQ2IQqoJQ0Qghqa2vLEqk0AdsSoUDu8Ic2BiUlQyOjhJRBqVw6Wtgn6O4bJpnVNDfUEA4FSSYT9A4MkkgkSCQSSCkQUUXcFvSnDcMZ/xg7snDmFO78+kdZunAaWAo8H53K8MBfn+O0pmp6B+Kcd+4CvvaJ93LpP96F52te2nuY7bsP8of/3sKi2a2kM44VjoSsdCrzhgAQGMzkyZMlIAuVG79QEZKSkUSKKdXF/GXtF/GyLl09gyTTDt39w+zr6GP77kM8sONlKioqWDKnGa01lhS5U1La0BU/Nj23ZC7V9bTm5/96HQvOnoPXM5jfJM21ufySpWzasosls5tRtmLBjCbKikK4rkckHEQg8HyfTc/tRqJVSXGsAMCEW+QTSkDG8QqHFAOv1SOpJCOjcb72lSspKYlxpKOX8pIY1eWS8y48AzwPPJ/Dnf1856cPsOX5l6koL8bT4yukEuSf5Z6vfeBJ6qvLiIaDBAM2ypIgJbg+71xwGsPxFAf3HuZgZ19upYzB6JyBFEIQCwfJZDPKmJNv/0/YIBAI4HneuDN2XY/yojBnzGkGITjSP4IBpk2tw+kbQhiQQtBQW8GPvnw1Sz58K1MqwqxbU8mtzzq4wuLzC21+v3OUaDTKY70B3l+fYkVTgKQO8PH1W9i5r4Mz57RQHAvjuB6DI0m6+0fo7h9hcCRJMu2Qdlw0ipilxoqiBRUFVH4B3xAARmtNNpt1Q6FQ6hjdEOD7hmDAIhoOES6OsnR+Pt0sikA6C75PJuMw3D3AD//3I2Rdn0g4RH1RiLLSMDfNkqw+XXH5tAh2UHD944rm8iir53ikE4KfT6vjmQPDbH1505htEFJiWzaBQIBAwMIOFhELy3yMoMdjQYqTBQEnkgDHcYTM5e4FAPKHlnPRXiLl8rUf/4HSomj+WItCCoFtK1zPZ3A0xcsHutjfOcDq88+krWuAD23Jck5DkMWVkBzVpH0oEZprWgzbBwWZhEZrQUxpKiaVUxSYhG/MWH6QO0leiDrN2LmicVfQHHOc7tQBMMYIK1cXTI73PBgKcdcDT6MLZ/oMYzF8JGQzpXYSJcVRli2ZSUfPIJnRIe5fFeK6x30eOij42AKLqGvwfcE3/654V7UhZAv6UzDsgNEeWcdwtNk4xZMmgtdxEHQCAHInc44cOUJtbe1xABhjsG2buslVxw2htSEStIiGFaPxJM+91E5idJRrZgSYWRngk7NhXZvG4JHwBJ0Zm6lFhhum+aDh5WFBe0IQsUAbwanxPMb4eN9fPwDGHFN7LMS55tg2Btcbt9LMaNJjOEF+C93F0TZzy3Nb51e0Ks6vV/z7cy7DnmRykWBfHEIqN+6PXlbok0RvJyGTE39jQJy0pwn2BY65dU/WyfHvC1S+DykEFoZPPukiBby3VVFrGe48LwDK0Dbgsa1PoiR8bptic4+gJAD+mwMBwIDxT9Zowlwgf+IFwDtZJycibcCS4Gm4/m8uj3ZorpgqmVIksKXAElAWNHzgbxYvDr5lzEPu6O5J5z6hCrymozdFxoAlclHtr3b7/HavT1UYIgGLjAzRl8mpQOlbxrwBcI0x2VmzZjM6eoo1waN3PPLFnLdmSkBZMHfSuT9jUK6hKCqYFDT5/0T0VjA/Ro7ve+mC9z4lAI52N0Iw/FYAUKACk7YEW4EUbznjhdXrSKWSCSFOHAr8H6hufvrt8D6XAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTIwVDE3OjQ1OjU4LTA0OjAw5tm57wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0yMFQxNzo0NTo1OC0wNDowMJeEAVMAAAAASUVORK5CYII=");
        r3.setType("fire");
        r3.setOrigin("user");
        r3.setLongitude(-43.1995803);
        r3.setLatitude(-22.8935492);
        r3.setDescription("fire reported");
        list.add(r3);

        return list;
    }


    public void Publish(Registro registro) {
        try{
            //ObjectMapper mapper;
            CloseableHttpClient httpclient = HttpClients.createDefault();
            HttpPost post = new HttpPost("https://pruu.herokuapp.com/dump/teste");
            post.setEntity(new StringEntity("MONEDA","application/json","UTF-8"));
            CloseableHttpResponse response = httpclient.execute(post);
            try {

            } finally {
                response.close();
            }

        }catch(Exception e){
            int a = 1;
        }

    }
}
