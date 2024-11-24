## Projeyi Başlatma

Bu projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Gerekli Araçlar

Projenin çalışabilmesi için aşağıdaki araçların bilgisayarınızda kurulu olması gerekmektedir:

- **Node.js**: React ve bağımlılıkları yüklemek için Node.js gereklidir. [Node.js İndir](https://nodejs.org/)
- **npm veya yarn**: Proje bağımlılıklarını yönetmek için npm veya yarn kullanılabilir. Node.js ile birlikte npm gelir, ancak yarn'ı ayrı olarak yüklemeniz gerekebilir. [Yarn İndir](https://yarnpkg.com/)

### 2. Projeyi İndirme

Projenin bulunduğu depoyu (repository) indirin veya klonlayın. Eğer proje GitHub üzerinde barınıyorsa, terminal üzerinden şu komutla klonlayabilirsiniz:

```bash
git clone https://github.com/username/project-name.git
```

# Select Component Özellikleri ve Yapılan Güncellemeler

Bu doküman, `Select` komponentinin özelliklerini ve yapılan güncellemeleri açıklamaktadır.

## Yapılan Özellikler

### 1. Dropdown Menüsü
Kullanıcı input alanına tıkladığında, dropdown menüsü açılır. (Focus olayına bağlıdır). Bu sayede kullanıcı daha kolay seçenekler arasında seçim yapabilir.

### 2. Dışarıya Tıklanma
Kullanıcı, dropdown menüsü veya input dışına tıkladığında dropdown kapanır. Bu özellik, `mousedown` eventi ile dinleniyor ve dışarıya tıklanması durumunda dropdown'un kapanmasını sağlar.

### 3. Yeni Item Ekleme
Arama kutusuna yazılan ve mevcut seçenekler arasında bulunmayan bir seçenek eklenebilir. Eğer arama kutusuna yazılan kelime mevcut seçeneklerde yer almıyorsa, kullanıcıya "Add" butonu ile yeni bir öğe ekleme seçeneği sunulur.

### 4. Tüm Seçenekleri Seçme
Kullanıcı `Ctrl + A` tuşlarına basarak tüm seçenekleri seçebilir veya seçimlerini kaldırabilir. Bu özellik sadece dropdown açıkken çalışır! 
- **Not:** `Ctrl + A` işlevi, dropdown menüsü açıkken etkinleşir. Eğer dropdown kapalıysa, bu işlev çalışmaz.

### 5. Seçilen Elemanlar
Seçilen elemanlar, input alanında küçük etiketler olarak görünür. Kullanıcı bu etiketleri tıklayarak seçimden çıkarabilir. Bu etiketler, seçilen öğeleri kolayca yönetmeyi sağlar.

### 6. Otomatik Filtreleme
Kullanıcı arama kutusuna yazdıkça, seçenekler filtrelenir ve yalnızca eşleşen öğeler gösterilir. Bu sayede kullanıcı sadece ihtiyacı olan seçenekleri görür.

## Kullanılan Teknolojiler ve Teknikler

- **React**: Kullanıcı arayüzünü oluşturmak için.
- **useState, useEffect, useMemo, useCallback**: React Hook'ları kullanılarak component state yönetimi ve performans optimizasyonları yapıldı.
- **aria-label ve role özellikleri**: Erişilebilirlik (Accessibility) amacıyla, kullanıcıların ekran okuyucularını daha verimli kullanabilmesi için eklendi.
- **Keyboard Event Handling**: `Ctrl + A` tuş kombinasyonu ile tüm seçeneklerin seçilmesi için klavye olayları kullanıldı.
