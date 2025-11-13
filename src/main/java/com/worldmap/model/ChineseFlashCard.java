package com.worldmap.model;

public class ChineseFlashCard {
    private long id;
    private String chineseWord;
    private String englishWord;
    private String pinyin;
    private String img;

    public ChineseFlashCard() {}

    public ChineseFlashCard(long id, String chineseWord, String englishWord, String pinyin, String img) {
        this.id = id;
        this.chineseWord = chineseWord;
        this.englishWord = englishWord;
        this.pinyin = pinyin;
        this.img = img;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getChineseWord() {
        return chineseWord;
    }

    public void setChineseWord(String chineseWord) {
        this.chineseWord = chineseWord;
    }

    public String getEnglishWord() {
        return englishWord;
    }

    public void setEnglishWord(String englishWord) {
        this.englishWord = englishWord;
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
