    (function () {

        types['NAME'] = {
            STOPWORDS: [],
            isDataComplete: function (data) {
                var that = this,
                    params = that.options.params,
                    fields = $.map(params && params.parts || ['surname', 'name', 'patronymic'], function (part) {
                        return part.toLowerCase();
                    });
                return utils.fieldsNotEmpty(data, fields);
            },
            composeValue: function (data) {
                return utils.compact([data.surname, data.name, data.patronymic]).join(' ');
            },
            urlSuffix: 'fio'
        };

        types['ADDRESS'] = {
            STOPWORDS: ['ао', 'аобл', 'дом', 'респ', 'а/я', 'аал', 'автодорога', 'аллея', 'арбан', 'аул', 'б-р', 'берег', 'бугор', 'вал', 'вл', 'волость', 'въезд', 'высел', 'г', 'городок', 'гск', 'д', 'двлд', 'днп', 'дор', 'дп', 'ж/д_будка', 'ж/д_казарм', 'ж/д_оп', 'ж/д_платф', 'ж/д_пост', 'ж/д_рзд', 'ж/д_ст', 'жилзона', 'жилрайон', 'жт', 'заезд', 'заимка', 'зона', 'к', 'казарма', 'канал', 'кв', 'кв-л', 'км', 'кольцо', 'комн', 'кордон', 'коса', 'кп', 'край', 'линия', 'лпх', 'м', 'массив', 'местность', 'мкр', 'мост', 'н/п', 'наб', 'нп', 'обл', 'округ', 'остров', 'оф', 'п', 'п/о', 'п/р', 'п/ст', 'парк', 'пгт', 'пер', 'переезд', 'пл', 'пл-ка', 'платф', 'погост', 'полустанок', 'починок', 'пр-кт', 'проезд', 'промзона', 'просек', 'просека', 'проселок', 'проток', 'протока', 'проулок', 'р-н', 'рзд', 'россия', 'рп', 'ряды', 'с', 'с/а', 'с/мо', 'с/о', 'с/п', 'с/с', 'сад', 'сквер', 'сл', 'снт', 'спуск', 'ст', 'ст-ца', 'стр', 'тер', 'тракт', 'туп', 'у', 'ул', 'уч-к', 'ф/х', 'ферма', 'х', 'ш', 'бульвар', 'владение', 'выселки', 'гаражно-строительный', 'город', 'деревня', 'домовладение', 'дорога', 'квартал', 'километр', 'комната', 'корпус', 'литер', 'леспромхоз', 'местечко', 'микрорайон', 'набережная', 'область', 'переулок', 'платформа', 'площадка', 'площадь', 'поселение', 'поселок', 'проспект', 'разъезд', 'район', 'республика', 'село', 'сельсовет', 'слобода', 'сооружение', 'станица', 'станция', 'строение', 'территория', 'тупик', 'улица', 'улус', 'участок', 'хутор', 'шоссе'],
            geoEnabled: true,
            isDataComplete: function (data) {
                var fields = ['house'];
                return utils.fieldsNotEmpty(data, fields) &&
                    (!('qc_complete' in data) || data.qc_complete !== QC_COMPLETE.NO_FLAT);
            },
            composeValue: function (data) {
                return utils.compact([
                    utils.compact([data.region_type, data.region]).join(' '),
                    utils.compact([data.area_type, data.area]).join(' '),
                    utils.compact([data.city_type, data.city]).join(' '),
                    utils.compact([data.settlement_type, data.settlement]).join(' '),
                    utils.compact([data.street_type, data.street]).join(' '),
                    utils.compact([data.house_type, data.house]).join(' '),
                    utils.compact([data.block_type, data.block]).join(' '),
                    utils.compact([data.flat_type, data.flat]).join(' '),
                    data.postal_box ? 'а/я ' + data.postal_box : null
                ]).join(', ');
            },
            urlSuffix: 'address'
        };
    }());