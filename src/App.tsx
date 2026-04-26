/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Users, 
  Globe, 
  Settings, 
  Plus, 
  ChevronLeft, 
  Save, 
  Eye, 
  Trash2, 
  Edit3,
  FileText,
  Layout,
  Share2,
  Maximize2,
  Minimize2,
  Search,
  Image as ImageIcon,
  Type,
  Bold,
  Italic,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Underline,
  PenTool,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'books' | 'characters' | 'world' | 'editor' | 'settings';

interface Novel {
  id: string;
  title: string;
  cover?: string;
  lastEdited: string;
  progress: number;
}

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
}

// --- App Component ---
export default function App() {
  const [currentView, setCurrentView] = useState<View>('books');
  const [activeNovel, setActiveNovel] = useState<Novel | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeFont, setActiveFont] = useState('font-serif');
  const [editorContent, setEditorContent] = useState('');
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  // Fonts available
  const fonts = [
    { id: 'font-serif', name: 'أميري (Amiri)' },
    { id: 'font-sans', name: 'نوتو (Noto)' },
    { id: 'font-tajawal', name: 'تجوّل (Tajawal)' },
    { id: 'font-cairo', name: 'كايرو (Cairo)' },
    { id: 'font-readex', name: 'ريدكس (Readex)' },
    { id: 'font-ibmplex', name: 'آي بي إم (IBM Plex)' },
    { id: 'font-changa', name: 'تشانجا (Changa)' },
    { id: 'font-mada', name: 'مدى (Mada)' },
    { id: 'font-arefruqaa', name: 'عارف رقعة (Aref Ruqaa)' },
  ];

  // Mock Data
  const novels: Novel[] = [
    { id: '1', title: 'سر الرمال المنسية', lastEdited: 'منذ ساعتين', progress: 65 },
    { id: '2', title: 'ظلال الأندلس', lastEdited: 'يوم أمس', progress: 20 },
  ];

  const characters: Character[] = [
    { id: '1', name: 'زيد اليماني', role: 'بطل القصة', description: 'فارس مغوار من نجد، يبحث عن سيف والده المفقود.', tags: ['شجاع', 'غامض'] },
    { id: '2', name: 'ليلى النجدية', role: 'شخصية ثانوية', description: 'طبيبة بارعة في مداواة الجروح القديمة.', tags: ['حكيمة'] },
  ];

  const renderSidebarItem = (id: View, label: string, Icon: any) => (
    <button 
      id={`nav-${id}`}
      onClick={() => setCurrentView(id)}
      className={`p-3 w-16 md:w-full rounded-2xl md:rounded-lg cursor-pointer flex flex-col items-center gap-1.5 transition-all duration-300 ${
        currentView === id 
          ? 'bg-[#c19a6b1a] text-[#c19a6b]' 
          : 'text-[#6b7280] hover:text-[#e0e0e0] hover:bg-[#1f2937]/50'
      }`}
    >
      <Icon size={24} strokeWidth={currentView === id ? 2.5 : 1.5} />
      <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const handleInsertImage = () => {
    const url = prompt('أدخل رابط الصورة:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div className="flex flex-row-reverse w-full min-h-screen overflow-hidden bg-[#0a0c10] text-[#e0e0e0] font-sans select-none" dir="rtl">
      {/* Sidebar - Navigation on the Right */}
      <AnimatePresence>
        {!isFocusMode && (
          <motion.nav 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-20 bg-[#12151c] border-r border-[#1f2937] flex-col items-center py-8 gap-10 shrink-0 z-30 hidden md:flex"
          >
            <div className="w-12 h-12 bg-[#c19a6b] rounded-xl flex items-center justify-center shadow-lg shadow-[#c19a6b1a]">
              <span className="text-[#0a0c10] text-2xl font-bold">ر</span>
            </div>

            <div className="flex flex-col gap-6">
              {renderSidebarItem('books', 'كتابة', Book)}
              {renderSidebarItem('characters', 'شخصيات', Users)}
              {renderSidebarItem('world', 'عالم', Globe)}
            </div>

            <div className="mt-auto">
              {renderSidebarItem('settings', 'إعدادات', Settings)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Bottom Navigation for Mobile */}
      {!isFocusMode && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0c10]/90 backdrop-blur-xl border-t border-[#1f2937] px-4 py-2 flex justify-between items-center z-50 pb-safe">
          {renderSidebarItem('books', 'كتابة', Book)}
          {renderSidebarItem('characters', 'شخصيات', Users)}
          {renderSidebarItem('world', 'عالم', Globe)}
          {renderSidebarItem('settings', 'إعدادات', Settings)}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-[100dvh] overflow-hidden pb-16 md:pb-0">
        {/* Top Header Bar */}
        <header className="h-16 px-4 md:px-8 border-b border-[#1f2937] flex items-center justify-between bg-[#0a0c10]/80 backdrop-blur-md shrink-0 z-20">
            <div className="flex gap-2 min-w-0">
              <h1 className="text-base md:text-lg font-serif italic text-white flex items-center gap-2 truncate">
                <span className="opacity-50 font-normal hidden sm:inline">مداد:</span>
                {activeNovel ? activeNovel.title : 'رواية جديدة'}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1a1e26] border border-[#374151] rounded text-[10px] text-[#9ca3af] uppercase tracking-widest leading-relaxed">مسودة</span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-[10px] text-[#6b7280]">تم الحفظ تلقائياً (١٤:٢٢)</span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="flex gap-2 md:gap-4">
                {currentView === 'editor' && (
                  <button 
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    className="px-3 md:px-4 py-1.5 bg-[#12151c] border border-[#c19a6b] text-[#c19a6b] rounded-full text-[10px] md:text-xs font-medium hover:bg-[#c19a6b] hover:text-[#0a0c10] transition-all"
                  >
                    {isFocusMode ? 'إنهاء التركيز' : 'التركيز'}
                  </button>
                )}
                {!isFocusMode && (
                  <button className="bg-[#c19a6b] text-[#0a0c10] px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-[#d4b085] transition-all text-[10px] md:text-xs font-bold whitespace-nowrap">
                    <Plus size={16} />
                    <span className="hidden sm:inline">جديد</span>
                  </button>
                )}
              </div>
            </div>
        </header>

        {/* Content Section */}
        <section className="flex-1 flex overflow-hidden">
          {/* Left/Context Panel (Only in some views) */}
          {!isFocusMode && (currentView === 'editor' || currentView === 'books') && (
            <aside className="w-72 bg-[#0d1016] border-l border-[#1f2937] flex flex-col p-6 hidden lg:flex shrink-0">
              <div className="mb-8">
                <h3 className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold mb-4">المسار الحالي</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-[#1a1e26] rounded-lg border-r-2 border-[#c19a6b]">
                    <p className="text-sm font-medium">الفصل الأول: البداية</p>
                    <p className="text-[10px] text-[#6b7280] mt-1">١,٢٤٠ كلمة • ٨٥٪</p>
                  </div>
                  <div className="p-3 hover:bg-[#151921] rounded-lg transition-colors cursor-pointer group">
                    <p className="text-sm text-[#9ca3af] group-hover:text-white">الفصل الثاني: التحول</p>
                    <p className="text-[10px] text-[#6b7280] mt-1">٨٠٠ كلمة • مسودة</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 border border-dashed border-[#374151] rounded-lg text-[10px] text-[#6b7280] hover:text-[#e0e0e0] hover:border-[#4b5563] uppercase tracking-widest">+ إضافة فصل</button>
              </div>

              <div className="mt-auto">
                <h3 className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold mb-4">شخصيات نشطة</h3>
                <div className="flex -space-x-reverse space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#12151c] bg-[#2a2f3a] flex items-center justify-center text-xs">ص</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#12151c] bg-[#3e2e2a] flex items-center justify-center text-xs">ق</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#12151c] bg-[#c19a6b] flex items-center justify-center text-xs text-black">+٣</div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Area */}
          <div className="flex-1 overflow-y-auto bg-[#0f1218] p-4 md:p-10 flex justify-center items-start">
            <AnimatePresence mode="wait">
              {currentView === 'books' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl pb-24 md:pb-8"
                >
                  {novels.map(novel => (
                    <motion.div 
                      key={novel.id}
                      whileHover={{ y: -8 }}
                      className="bg-[#12151c] p-6 rounded-2xl border border-[#1f2937] group relative overflow-hidden shadow-xl"
                    >
                      <div className="w-full aspect-[3/4] bg-[#1a1e26] rounded-xl mb-6 flex items-center justify-center text-[#374151] border border-[#1f2937]">
                        <Book size={64} strokeWidth={0.5} />
                      </div>
                      <h3 className="font-serif text-xl font-bold mb-2 text-white group-hover:text-[#c19a6b] transition-colors">{novel.title}</h3>
                      <div className="flex justify-between items-center text-[10px] text-[#6b7280] mb-4 uppercase tracking-widest">
                        <span>{novel.lastEdited}</span>
                        <span>{novel.progress}%</span>
                      </div>
                      <div className="w-full bg-[#1f2937] h-1 rounded-full mb-6 relative overflow-hidden">
                        <div className="bg-[#c19a6b] h-full absolute inset-y-0 right-0 transition-all duration-1000" style={{ width: `${novel.progress}%` }} />
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => { setActiveNovel(novel); setCurrentView('editor'); }}
                          className="flex-1 bg-[#c19a6b] text-[#0a0c10] py-2.5 rounded-xl font-bold text-xs hover:bg-[#d4b085] transition-all"
                        >
                          بدء الكتابة
                        </button>
                        <button className="p-2.5 border border-[#1f2937] rounded-xl text-[#374151] hover:text-red-400 hover:border-red-400/30 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {currentView === 'editor' && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-full max-w-[700px] bg-[#fdfcf8] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] md:rounded-sm p-6 md:p-16 lg:p-20 text-[#1a1a1a] flex flex-col min-h-screen mb-32 ${activeFont}`}
                >
                  <div className="text-center mb-10 md:mb-16 mt-4 md:mt-0">
                    <input 
                      type="text" 
                      defaultValue={activeNovel?.title}
                      className="text-3xl md:text-5xl font-bold text-center border-none focus:ring-0 w-full mb-4 outline-none placeholder:text-slate-200 bg-transparent"
                      placeholder="عنوان الرواية"
                    />
                    <div className="h-px w-24 bg-[#c19a6b] mx-auto opacity-30 mt-4"></div>
                  </div>
                  
                  {/* Rich Text Editor */}
                  <div
                    className="w-full flex-1 text-lg md:text-xl leading-[2.2] border-none focus:ring-0 outline-none text-[#2a2a2a] min-h-[50vh] focus-visible:outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
                    onFocus={() => setIsToolbarOpen(true)}
                  >
                    <p>كانت الرياح تحمل معها رائحة المطر البعيد قبل أن تلمس الرمال سطح الأرض...</p>
                  </div>
                  
                  <footer className="mt-20 text-center border-t border-slate-200 pt-8 opacity-40">
                    <span className="text-xs font-sans tracking-[0.3em]">- ١ -</span>
                  </footer>
                </motion.div>
              )}

              {currentView === 'characters' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl pb-24 md:pb-8">
                  {characters.map(char => (
                    <div key={char.id} className="bg-[#12151c] p-4 md:p-6 rounded-2xl border border-[#1f2937] flex gap-4 md:gap-5 items-start active:scale-[0.98] transition-transform md:active:scale-100 cursor-pointer">
                      <div className="w-16 h-16 bg-[#1a1e26] rounded-xl shrink-0 flex items-center justify-center text-[#c19a6b] border border-[#1f2937]">
                        <Users size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-lg">{char.name}</h4>
                            <span className="text-[10px] text-[#c19a6b] uppercase tracking-widest font-medium">{char.role}</span>
                          </div>
                          <button className="text-[#374151] hover:text-[#c19a6b]"><Edit3 size={16}/></button>
                        </div>
                        <p className="text-sm text-[#9ca3af] mt-4 leading-relaxed line-clamp-2">{char.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {char.tags.map(tag => (
                            <span key={tag} className="text-[9px] bg-[#1a1e26] border border-[#1f2937] px-2 py-0.5 rounded text-[#6b7280]">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentView === 'world' && (
                 <div className="flex flex-col items-center justify-center p-6 md:p-20 text-center w-full pb-24 md:pb-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#12151c] text-[#c19a6b] rounded-full flex items-center justify-center mb-6 md:mb-8 border border-[#c19a6b22] shadow-2xl">
                      <Globe size={40} className="md:w-12 md:h-12" strokeWidth={1} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-4">بناء الأساطير والعوالم</h3>
                    <p className="text-[#6b7280] max-w-md leading-relaxed text-sm md:text-base">قم بتخطيط الجغرافيا، الأديان، الممالك، وأنظمة السحر. هذا القسم هو المستودع المعرفي لروايتك.</p>
                    <button className="mt-8 md:mt-10 px-8 py-3 bg-transparent border border-[#c19a6b] text-[#c19a6b] rounded-full hover:bg-[#c19a6b] hover:text-[#0a0c10] transition-all font-bold text-xs tracking-widest uppercase">إنشاء أول كيان</button>
                 </div>
              )}

              {currentView === 'settings' && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="w-full max-w-2xl bg-[#12151c] p-6 md:p-10 rounded-3xl border border-[#1f2937] shadow-xl pb-24 md:pb-10"
                 >
                    <h2 className="text-2xl font-serif mb-8 text-white flex items-center gap-3">
                      <Settings className="text-[#c19a6b]" />
                      الإعدادات والتخصيص
                    </h2>
                    
                    <div className="space-y-8">
                      {/* Font Settings */}
                      <div>
                        <h3 className="text-sm text-[#9ca3af] uppercase tracking-widest mb-4">نوع الخط المستخدم</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {fonts.map(font => (
                            <button
                              key={font.id}
                              onClick={() => setActiveFont(font.id)}
                              className={`py-3 px-4 rounded-xl border text-sm transition-all ${
                                activeFont === font.id 
                                  ? 'bg-[#c19a6b1a] border-[#c19a6b] text-[#c19a6b]' 
                                  : 'border-[#1f2937] text-[#6b7280] hover:border-[#374151]'
                              } ${font.id}`}
                            >
                              {font.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-[#1f2937] w-full" />

                      {/* Export Options */}
                      <div>
                        <h3 className="text-sm text-[#9ca3af] uppercase tracking-widest mb-4">تصدير الرواية (المشروع الحالي)</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="flex-1 py-4 bg-[#1a1e26] border border-[#374151] rounded-2xl flex flex-col items-center gap-2 hover:bg-[#1f2937] transition-all">
                            <span className="font-bold text-white text-lg">PDF</span>
                            <span className="text-[10px] text-[#6b7280]">جاهز للطباعة</span>
                          </button>
                          <button className="flex-1 py-4 bg-[#1a1e26] border border-[#374151] rounded-2xl flex flex-col items-center gap-2 hover:bg-[#1f2937] transition-all">
                            <span className="font-bold text-white text-lg">EPUB</span>
                            <span className="text-[10px] text-[#6b7280]">لأجهزة كيندل والقارئات</span>
                          </button>
                          <button className="flex-1 py-4 bg-[#1a1e26] border border-[#374151] rounded-2xl flex flex-col items-center gap-2 hover:bg-[#1f2937] transition-all">
                            <span className="font-bold text-white text-lg">DOCX</span>
                            <span className="text-[10px] text-[#6b7280]">وورد والمحررات المكتبية</span>
                          </button>
                        </div>
                      </div>
                    </div>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom Status Bar */}
        <footer className="h-12 md:h-10 bg-[#0a0c10] md:bg-[#12151c] border-t border-[#1f2937] px-4 md:px-6 flex items-center justify-between text-[10px] md:text-[11px] text-[#6b7280] font-mono shrink-0 hidden md:flex">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="opacity-50 uppercase">اللغة:</span>
              <span className="text-[#c19a6b]">العربية (RTL)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-50 uppercase">الكلمات:</span>
              <span className="text-[#e0e0e0]">١٤,٢٨٢</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 h-1 bg-[#1f2937] rounded-full overflow-hidden">
                <div className="bg-[#c19a6b] h-full transition-all" style={{ width: '42%' }}></div>
              </div>
              <span className="opacity-80">هدف اليوم: ٤٢٪</span>
            </div>
            <span className="text-[#374151] hidden sm:inline">مشفر محلياً (إيزي/هايف)</span>
          </div>
        </footer>
      </main>

      {/* Editor Formatting & Action Navigation Overlay */}
      {currentView === 'editor' && !isFocusMode && (
        <div className="fixed bottom-20 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center gap-2 md:gap-6 w-[90%] md:w-auto z-40 bg-transparent pointer-events-none text-black">
          
          {/* Main Formatting Bar - Collapsible */}
          <AnimatePresence mode="wait">
            {isToolbarOpen ? (
              <motion.div 
                key="toolbar"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto flex items-center gap-2 md:gap-3 bg-[#12151c]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border border-[#1f2937] px-3 md:px-5 py-2 md:py-3 rounded-full w-full justify-between md:w-auto md:justify-center overflow-x-auto hide-scrollbar"
              >
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => setIsToolbarOpen(false)} className="p-1.5 md:p-2 text-[#c19a6b] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><X size={18} /></button>
                <div className="w-px h-5 bg-[#374151] shrink-0" />
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('bold')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><Bold size={18} /></button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('italic')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><Italic size={18} /></button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('underline')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><Underline size={18} /></button>
                <div className="w-px h-5 bg-[#374151] shrink-0" />
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyRight')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><AlignRight size={18} /></button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyCenter')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><AlignCenter size={18} /></button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => execCommand('justifyLeft')} className="p-1.5 md:p-2 text-[#9ca3af] hover:text-white hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"><AlignLeft size={18} /></button>
                <div className="w-px h-5 bg-[#374151] shrink-0" />
                
                {/* Adding Image */}
                <button 
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleInsertImage}
                  title="إضافة صورة"
                  className="p-1.5 md:p-2 text-[#c19a6b] hover:text-[#d4b085] hover:bg-[#1f2937] rounded-lg transition-colors shrink-0"
                >
                  <ImageIcon size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="toggle"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsToolbarOpen(true)}
                className="pointer-events-auto p-3 bg-[#12151c]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border border-[#1f2937] rounded-full text-[#c19a6b] hover:text-white hover:bg-[#1f2937] transition-colors"
              >
                <PenTool size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Quick Actions (Save, exit) visible on mobile + desktop */}
          <div className="pointer-events-auto flex items-center justify-between mt-2 md:mt-0 md:bg-[#12151c]/95 md:backdrop-blur-xl md:shadow-2xl md:border md:border-[#1f2937] md:px-5 md:py-3 md:rounded-full gap-4 w-full md:w-auto p-2 bg-[#12151c] rounded-full border border-[#1f2937]">
            <button 
               onClick={() => setCurrentView('books')}
               className="text-[#9ca3af] hover:text-white flex items-center gap-1 text-xs pr-2"
            >
              <ChevronLeft size={16} />
              <span className="hidden md:inline">العودة</span>
            </button>
            <button className="bg-[#c19a6b] text-[#0a0c10] px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 text-xs font-bold shrink-0">
               <Save size={16} />
               <span>حفظ الآن</span>
            </button>
          </div>
        </div>
      )}

      {/* Hide Side Go-Back button on desktop to replace by new bottom action */}
    </div>
  );
}
